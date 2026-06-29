output "alb_security_group_id" {
  value = aws_security_group.alb.id
}

output "frontend_service_security_group_id" {
  value = aws_security_group.frontend_service.id
}

output "backend_service_security_group_id" {
  value = aws_security_group.backend_service.id
}

output "rds_placeholder_security_group_id" {
  value = aws_security_group.rds_placeholder.id
}
