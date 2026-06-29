output "role_arn" {
  value = aws_iam_role.github_actions_deploy.arn
}

output "role_name" {
  value = aws_iam_role.github_actions_deploy.name
}

output "oidc_provider_arn" {
  value = local.oidc_provider_arn
}
