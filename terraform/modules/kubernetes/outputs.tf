output "namespace" {
  description = "JourneySync Kubernetes namespace"
  value       = kubernetes_namespace.journeysync.metadata[0].name
}
