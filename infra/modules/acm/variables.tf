variable "domain_name" {
  type = string
}

variable "subject_alternative_names" {
  type    = list(string)
  default = []
}

variable "route53_zone_id" {
  type    = string
  default = ""
}

variable "create_dns_validation_records" {
  type    = bool
  default = true
}

variable "tags" {
  type    = map(string)
  default = {}
}
