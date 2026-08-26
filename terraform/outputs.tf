output "kubernetes_context" {
  description = "Kubernetes context used by Terraform"
  value       = var.kubernetes_context
}

output "journeysync_namespace" {
  description = "Namespace managed by the Kubernetes module"
  value       = module.kubernetes.namespace
}
