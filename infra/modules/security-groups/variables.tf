variable "name_prefix" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "frontend_container_port" {
  type = number
}

variable "backend_container_port" {
  type = number
}

variable "tags" {
  type    = map(string)
  default = {}
}
