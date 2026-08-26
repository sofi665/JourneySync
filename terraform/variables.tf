variable "kubernetes_context" {
  description = "Kubernetes context used by Terraform"
  type        = string
  default     = "docker-desktop"
}

variable "namespace" {
  description = "Kubernetes namespace used by JourneySync"
  type        = string
  default     = "journeysync"
}

variable "environment" {
  description = "Environment where JourneySync is deployed"
  type        = string
  default     = "local"
}
