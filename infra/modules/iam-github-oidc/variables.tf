variable "name_prefix" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "aws_account_id" {
  type = string
}

variable "github_org" {
  type = string
}

variable "github_repo" {
  type = string
}

variable "github_allowed_branches" {
  type = list(string)
}

variable "github_allowed_environments" {
  type = list(string)
}

variable "create_github_oidc_provider" {
  type = bool
}

variable "existing_github_oidc_provider_arn" {
  type = string
}

variable "frontend_repository_arn" {
  type = string
}

variable "backend_repository_arn" {
  type = string
}

variable "ecs_cluster_arn" {
  type = string
}

variable "frontend_service_arn" {
  type = string
}

variable "backend_service_arn" {
  type = string
}

variable "frontend_task_family" {
  type = string
}

variable "backend_task_family" {
  type = string
}

variable "tags" {
  type    = map(string)
  default = {}
}
