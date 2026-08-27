resource "kubernetes_namespace" "journeysync" {
  metadata {
    name = var.namespace
  }
}

resource "kubernetes_config_map" "journeysync" {
  metadata {
    name      = "journeysync-config"
    namespace = kubernetes_namespace.journeysync.metadata[0].name
  }

  data = {
    environment = var.environment
  }
}

resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "journeysync-backend"
    namespace = kubernetes_namespace.journeysync.metadata[0].name
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "journeysync-backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "journeysync-backend"
        }
      }

      spec {
        container {
          name              = "backend"
          image             = "journeysync-backend:latest"
          image_pull_policy = "Never"

          port {
            container_port = 8080
          }

          env {
            name  = "SPRING_DATASOURCE_URL"
            value = "jdbc:postgresql://postgres:5432/travel_planner"
          }

          env {
            name  = "SPRING_DATASOURCE_USERNAME"
            value = "postgres"
          }

          env {
            name = "SPRING_DATASOURCE_PASSWORD"

            value_from {
              secret_key_ref {
                name = "journeysync-secrets"
                key  = "postgres-password"
              }
            }
          }

          env {
            name = "JWT_SECRET"

            value_from {
              secret_key_ref {
                name = "journeysync-secrets"
                key  = "jwt-secret"
              }
            }
          }

          env {
            name  = "JWT_EXPIRATION"
            value = "86400000"
          }

          readiness_probe {
            http_get {
              path = "/actuator/health"
              port = 8080
            }

            initial_delay_seconds = 20
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 10
          }

          liveness_probe {
            http_get {
              path = "/actuator/health"
              port = 8080
            }

            initial_delay_seconds = 40
            period_seconds        = 20
            timeout_seconds       = 5
            failure_threshold     = 5
          }

          resources {
            requests = {
              cpu    = "250m"
              memory = "512Mi"
            }

            limits = {
              cpu    = "1000m"
              memory = "1Gi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name      = "journeysync-backend"
    namespace = kubernetes_namespace.journeysync.metadata[0].name
  }

  spec {
    selector = {
      app = "journeysync-backend"
    }

    type = "NodePort"

    port {
      protocol    = "TCP"
      port        = 8080
      target_port = 8080
      node_port   = 30080
    }
  }
}

resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "journeysync-frontend"
    namespace = kubernetes_namespace.journeysync.metadata[0].name
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "journeysync-frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "journeysync-frontend"
        }
      }

      spec {
        container {
          name              = "frontend"
          image             = "journeysync-frontend:latest"
          image_pull_policy = "Never"

          port {
            container_port = 3000
          }

          env {
            name  = "NODE_ENV"
            value = "production"
          }

          readiness_probe {
            http_get {
              path = "/"
              port = 3000
            }

            initial_delay_seconds = 10
            period_seconds        = 10
          }

          liveness_probe {
            http_get {
              path = "/"
              port = 3000
            }

            initial_delay_seconds = 20
            period_seconds        = 20
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "256Mi"
            }

            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "journeysync-frontend"
    namespace = kubernetes_namespace.journeysync.metadata[0].name
  }

  spec {
    selector = {
      app = "journeysync-frontend"
    }

    type = "NodePort"

    port {
      protocol    = "TCP"
      port        = 3000
      target_port = 3000
      node_port   = 30500
    }
  }
}
