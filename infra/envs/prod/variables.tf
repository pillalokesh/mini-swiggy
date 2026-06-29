variable "project_name" { type = string }
variable "owner" { type = string }
variable "aws_region" { type = string }
variable "availability_zones" { type = list(string) }
variable "vpc_cidr" { type = string }
variable "public_subnet_cidrs" { type = list(string) }
variable "private_subnet_cidrs" { type = list(string) }
variable "enable_nat_gateway" { type = bool }
variable "domain_name" { type = string }

variable "route53_zone_id" {
  type    = string
  default = ""
}

variable "route53_zone_name" {
  type    = string
  default = ""
}

variable "create_route53_records" { type = bool }
variable "create_acm_validation_records" { type = bool }
variable "backend_routing_mode" { type = string }

variable "api_domain_name" {
  type    = string
  default = ""
}

variable "frontend_container_port" { type = number }
variable "backend_container_port" { type = number }
variable "frontend_health_check_path" { type = string }
variable "backend_health_check_path" { type = string }
variable "frontend_cpu" { type = number }
variable "frontend_memory" { type = number }
variable "backend_cpu" { type = number }
variable "backend_memory" { type = number }
variable "frontend_desired_count" { type = number }
variable "backend_desired_count" { type = number }
variable "log_retention_days" { type = number }
variable "frontend_image_tag" { type = string }
variable "backend_image_tag" { type = string }
variable "frontend_environment" { type = map(string) }
variable "backend_environment" { type = map(string) }
variable "frontend_secrets" { type = map(string) }
variable "backend_secrets" { type = map(string) }
variable "github_org" { type = string }
variable "github_repo" { type = string }
variable "github_allowed_branches" { type = list(string) }
variable "github_allowed_environments" { type = list(string) }
variable "create_github_oidc_provider" { type = bool }
variable "existing_github_oidc_provider_arn" { type = string }
variable "create_basic_alarms" { type = bool }
variable "alarm_sns_topic_arn" { type = string }
