output "certificate_arn" {
  value = aws_acm_certificate.this.arn
}

output "validation_records" {
  value = local.validation_options
}
