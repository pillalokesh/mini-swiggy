output "alb_dns_name" {
  value = module.stack.alb_dns_name
}

output "ecs_cluster_name" {
  value = module.stack.ecs_cluster_name
}

output "frontend_ecr_repository_url" {
  value = module.stack.frontend_ecr_repository_url
}

output "backend_ecr_repository_url" {
  value = module.stack.backend_ecr_repository_url
}

output "github_actions_deploy_role_arn" {
  value = module.stack.github_actions_deploy_role_arn
}

output "certificate_arn" {
  value = module.stack.acm_certificate_arn
}
