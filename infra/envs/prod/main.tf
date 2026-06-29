module "stack" {
  source = "../.."

  project_name = var.project_name
  environment  = "prod"
  owner        = var.owner

  aws_region         = var.aws_region
  availability_zones = var.availability_zones

  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  enable_nat_gateway   = var.enable_nat_gateway

  domain_name                    = var.domain_name
  route53_zone_id                = var.route53_zone_id
  route53_zone_name              = var.route53_zone_name
  create_route53_records         = var.create_route53_records
  create_acm_validation_records  = var.create_acm_validation_records

  backend_routing_mode = var.backend_routing_mode
  api_domain_name      = var.api_domain_name

  frontend_container_port = var.frontend_container_port
  backend_container_port  = var.backend_container_port

  frontend_health_check_path = var.frontend_health_check_path
  backend_health_check_path  = var.backend_health_check_path

  frontend_cpu = var.frontend_cpu
  frontend_memory = var.frontend_memory
  backend_cpu = var.backend_cpu
  backend_memory = var.backend_memory

  frontend_desired_count = var.frontend_desired_count
  backend_desired_count  = var.backend_desired_count

  log_retention_days = var.log_retention_days

  frontend_image_tag = var.frontend_image_tag
  backend_image_tag  = var.backend_image_tag

  frontend_environment = var.frontend_environment
  backend_environment  = var.backend_environment

  frontend_secrets = var.frontend_secrets
  backend_secrets  = var.backend_secrets

  github_org                  = var.github_org
  github_repo                 = var.github_repo
  github_allowed_branches     = var.github_allowed_branches
  github_allowed_environments = var.github_allowed_environments

  create_github_oidc_provider    = var.create_github_oidc_provider
  existing_github_oidc_provider_arn = var.existing_github_oidc_provider_arn

  create_basic_alarms = var.create_basic_alarms
  alarm_sns_topic_arn = var.alarm_sns_topic_arn
}
