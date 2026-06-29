output "aws_account_id" {
  description = "AWS account ID used for this deployment."
  value       = data.aws_caller_identity.current.account_id
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer."
  value       = module.alb.alb_dns_name
}

output "alb_zone_id" {
  description = "Canonical hosted zone ID for the ALB."
  value       = module.alb.alb_zone_id
}

output "route53_zone_id" {
  description = "Route53 hosted zone ID used by this stack when available."
  value       = local.selected_route53_zone_id
}

output "ecs_cluster_name" {
  description = "ECS cluster name."
  value       = module.ecs_cluster.cluster_name
}

output "frontend_service_name" {
  description = "Frontend ECS service name."
  value       = module.frontend_service.service_name
}

output "backend_service_name" {
  description = "Backend ECS service name."
  value       = module.backend_service.service_name
}

output "frontend_ecr_repository_url" {
  description = "Frontend ECR repository URL."
  value       = module.ecr.frontend_repository_url
}

output "backend_ecr_repository_url" {
  description = "Backend ECR repository URL."
  value       = module.ecr.backend_repository_url
}

output "github_actions_deploy_role_arn" {
  description = "IAM role ARN assumed by GitHub Actions via OIDC."
  value       = module.iam_github_oidc.role_arn
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN used by the ALB HTTPS listener."
  value       = module.acm.certificate_arn
}

output "frontend_task_family" {
  description = "Frontend ECS task definition family."
  value       = module.frontend_service.task_family
}

output "backend_task_family" {
  description = "Backend ECS task definition family."
  value       = module.backend_service.task_family
}

output "frontend_task_execution_role_arn" {
  description = "Frontend task execution role ARN."
  value       = module.frontend_service.execution_role_arn
}

output "backend_task_execution_role_arn" {
  description = "Backend task execution role ARN."
  value       = module.backend_service.execution_role_arn
}

output "frontend_task_role_arn" {
  description = "Frontend task role ARN."
  value       = module.frontend_service.task_role_arn
}

output "backend_task_role_arn" {
  description = "Backend task role ARN."
  value       = module.backend_service.task_role_arn
}
