provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = var.kubernetes_context
}

module "kubernetes" {
  source = "./modules/kubernetes"

  namespace   = var.namespace
  environment = var.environment
}
