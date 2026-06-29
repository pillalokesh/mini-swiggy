variable "create_records" {
  type = bool
}

variable "zone_id" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "api_domain_name" {
  type    = string
  default = ""
}

variable "alb_dns_name" {
  type = string
}

variable "alb_zone_id" {
  type = string
}
