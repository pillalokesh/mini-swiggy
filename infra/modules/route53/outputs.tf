output "app_record_fqdn" {
  value = try(one(aws_route53_record.app_alias[*].fqdn), null)
}

output "api_record_fqdn" {
  value = try(one(aws_route53_record.api_alias[*].fqdn), null)
}
