variable "project_name" {
  description = "Project identifier used in resource naming."
  type        = string
}

variable "environment" {
  description = "Environment name, e.g. dev or prod."
  type        = string
}

variable "owner" {
  description = "Owner or team name for tagging."
  type        = string
  default     = "platform-team"
}

variable "aws_region" {
  description = "AWS region for infrastructure deployment."
  type        = string
}

variable "availability_zones" {
  description = "Availability zones used to place public and private subnets."
  type        = list(string)
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets."
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets."
  type        = list(string)
}

variable "enable_nat_gateway" {
  description = "Whether to create a single NAT gateway for private subnet egress."
  type        = bool
  default     = true
}

variable "domain_name" {
  description = "Primary app domain used by ALB listener certificates and DNS records, e.g. app.example.com."
  type        = string
}

variable "route53_zone_id" {
  description = "Existing Route53 hosted zone ID. Leave empty to resolve by route53_zone_name or use external DNS."
  type        = string
  default     = ""
}

variable "route53_zone_name" {
  description = "Route53 hosted zone name such as example.com. Used if route53_zone_id is empty."
  type        = string
  default     = ""
}

variable "create_route53_records" {
  description = "Whether to create Route53 alias records for this environment."
  type        = bool
  default     = true
}

variable "create_acm_validation_records" {
  description = "Whether to create Route53 DNS validation records for ACM certificate."
  type        = bool
  default     = true
}

variable "backend_routing_mode" {
  description = "Routing mode to backend service: path or host."
  type        = string
  default     = "path"

  validation {
    condition     = contains(["path", "host"], var.backend_routing_mode)
    error_message = "backend_routing_mode must be either path or host."
  }
}

variable "api_domain_name" {
  description = "Optional API domain, required when backend_routing_mode is host."
  type        = string
  default     = ""
}

variable "frontend_container_port" {
  description = "Frontend container port exposed to target group."
  type        = number
  default     = 3000
}

variable "backend_container_port" {
  description = "Backend container port exposed to target group."
  type        = number
  default     = 8000
}

variable "frontend_health_check_path" {
  description = "Health check path for frontend target group."
  type        = string
  default     = "/"
}

variable "backend_health_check_path" {
  description = "Health check path for backend target group."
  type        = string
  default     = "/health"
}

variable "frontend_cpu" {
  description = "Frontend task CPU units."
  type        = number
}

variable "frontend_memory" {
  description = "Frontend task memory in MiB."
  type        = number
}

variable "backend_cpu" {
  description = "Backend task CPU units."
  type        = number
}

variable "backend_memory" {
  description = "Backend task memory in MiB."
  type        = number
}

variable "frontend_desired_count" {
  description = "Desired number of frontend tasks."
  type        = number
}

variable "backend_desired_count" {
  description = "Desired number of backend tasks."
  type        = number
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days."
  type        = number
  default     = 30
}

variable "frontend_image_tag" {
  description = "Initial frontend image tag. CI/CD updates this after bootstrap."
  type        = string
  default     = "bootstrap"
}

variable "backend_image_tag" {
  description = "Initial backend image tag. CI/CD updates this after bootstrap."
  type        = string
  default     = "bootstrap"
}

variable "frontend_environment" {
  description = "Environment variables for frontend container."
  type        = map(string)
  default     = {}
}

variable "backend_environment" {
  description = "Environment variables for backend container."
  type        = map(string)
  default     = {}
}

variable "frontend_secrets" {
  description = "Map of frontend secret env var names to Secrets Manager or SSM ARNs."
  type        = map(string)
  default     = {}
}

variable "backend_secrets" {
  description = "Map of backend secret env var names to Secrets Manager or SSM ARNs."
  type        = map(string)
  default     = {}
}

variable "github_org" {
  description = "GitHub organization or user owning the repository."
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name for OIDC trust configuration."
  type        = string
}

variable "github_allowed_branches" {
  description = "GitHub branches allowed to assume the deploy role."
  type        = list(string)
  default     = ["main", "develop"]
}

variable "github_allowed_environments" {
  description = "Optional GitHub environments allowed to assume the deploy role."
  type        = list(string)
  default     = ["dev", "prod"]
}

variable "create_github_oidc_provider" {
  description = "Whether to create the GitHub Actions OIDC provider in this account."
  type        = bool
  default     = false
}

variable "existing_github_oidc_provider_arn" {
  description = "Existing OIDC provider ARN when create_github_oidc_provider is false."
  type        = string
  default     = ""
}

variable "create_basic_alarms" {
  description = "Create basic CloudWatch alarms for ALB target health and ECS service running tasks."
  type        = bool
  default     = true
}

variable "alarm_sns_topic_arn" {
  description = "Optional SNS topic ARN for alarm notifications."
  type        = string
  default     = ""
}
