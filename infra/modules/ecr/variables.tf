variable "name_prefix" {
  type = string
}

variable "max_image_count" {
  type    = number
  default = 50
}

variable "tags" {
  type    = map(string)
  default = {}
}
