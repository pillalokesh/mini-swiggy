variable "name_prefix" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "public_subnet_ids" {
  type = list(string)
}

variable "alb_security_group_id" {
  type = string
}

variable "certificate_arn" {
  type = string
}

variable "frontend_container_port" {
  type = number
}

variable "backend_container_port" {
  type = number
}

variable "frontend_health_check_path" {
  type = string
}

variable "backend_health_check_path" {
  type = string
}

variable "backend_routing_mode" {
  type = string
}

variable "api_domain_name" {
  type    = string
  default = ""
}

variable "tags" {
  type    = map(string)
  default = {}
}
