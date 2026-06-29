module "vpc" {
  source = "./modules/vpc"

  name_prefix          = local.name_prefix
  vpc_cidr             = var.vpc_cidr
  availability_zones   = var.availability_zones
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  enable_nat_gateway   = var.enable_nat_gateway
  tags                 = local.common_tags
}

module "security_groups" {
  source = "./modules/security-groups"

  name_prefix             = local.name_prefix
  vpc_id                  = module.vpc.vpc_id
  frontend_container_port = var.frontend_container_port
  backend_container_port  = var.backend_container_port
  tags                    = local.common_tags
}

module "ecr" {
  source = "./modules/ecr"

  name_prefix = local.name_prefix
  tags        = local.common_tags
}

module "acm" {
  source = "./modules/acm"

  domain_name                    = var.domain_name
  subject_alternative_names      = var.backend_routing_mode == "host" && var.api_domain_name != "" ? [var.api_domain_name] : []
  route53_zone_id                = local.selected_route53_zone_id
  create_dns_validation_records  = var.create_acm_validation_records && local.selected_route53_zone_id != null
  tags                           = local.common_tags
}

module "alb" {
  source = "./modules/alb"

  name_prefix                 = local.name_prefix
  vpc_id                      = module.vpc.vpc_id
  public_subnet_ids           = module.vpc.public_subnet_ids
  alb_security_group_id       = module.security_groups.alb_security_group_id
  certificate_arn             = module.acm.certificate_arn
  frontend_container_port     = var.frontend_container_port
  backend_container_port      = var.backend_container_port
  frontend_health_check_path  = var.frontend_health_check_path
  backend_health_check_path   = var.backend_health_check_path
  backend_routing_mode        = var.backend_routing_mode
  api_domain_name             = var.api_domain_name
  tags                        = local.common_tags
}

module "route53" {
  source = "./modules/route53"

  create_records  = var.create_route53_records && local.selected_route53_zone_id != null
  zone_id         = local.selected_route53_zone_id
  domain_name     = var.domain_name
  api_domain_name = var.backend_routing_mode == "host" ? var.api_domain_name : ""
  alb_dns_name    = module.alb.alb_dns_name
  alb_zone_id     = module.alb.alb_zone_id
}

module "ecs_cluster" {
  source = "./modules/ecs-cluster"

  name_prefix = local.name_prefix
  tags        = local.common_tags
}

module "frontend_service" {
  source = "./modules/ecs-service"

  name_prefix                = local.name_prefix
  service_component          = "frontend"
  cluster_id                 = module.ecs_cluster.cluster_id
  cluster_name               = module.ecs_cluster.cluster_name
  private_subnet_ids         = module.vpc.private_subnet_ids
  service_security_group_id  = module.security_groups.frontend_service_security_group_id
  target_group_arn           = module.alb.frontend_target_group_arn
  container_port             = var.frontend_container_port
  container_healthcheck_path = var.frontend_health_check_path
  cpu                        = var.frontend_cpu
  memory                     = var.frontend_memory
  desired_count              = var.frontend_desired_count
  image                      = "${module.ecr.frontend_repository_url}:${var.frontend_image_tag}"
  environment_variables      = var.frontend_environment
  secrets                    = var.frontend_secrets
  log_retention_days         = var.log_retention_days
  assign_public_ip           = false
  health_check_grace_seconds = 60
  tags                       = merge(local.common_tags, { Component = "frontend" })
}

module "backend_service" {
  source = "./modules/ecs-service"

  name_prefix                = local.name_prefix
  service_component          = "backend"
  cluster_id                 = module.ecs_cluster.cluster_id
  cluster_name               = module.ecs_cluster.cluster_name
  private_subnet_ids         = module.vpc.private_subnet_ids
  service_security_group_id  = module.security_groups.backend_service_security_group_id
  target_group_arn           = module.alb.backend_target_group_arn
  container_port             = var.backend_container_port
  container_healthcheck_path = var.backend_health_check_path
  cpu                        = var.backend_cpu
  memory                     = var.backend_memory
  desired_count              = var.backend_desired_count
  image                      = "${module.ecr.backend_repository_url}:${var.backend_image_tag}"
  environment_variables      = var.backend_environment
  secrets                    = var.backend_secrets
  log_retention_days         = var.log_retention_days
  assign_public_ip           = false
  health_check_grace_seconds = 90
  tags                       = merge(local.common_tags, { Component = "backend" })
}

module "iam_github_oidc" {
  source = "./modules/iam-github-oidc"

  name_prefix                     = local.name_prefix
  aws_region                      = var.aws_region
  aws_account_id                  = data.aws_caller_identity.current.account_id
  github_org                      = var.github_org
  github_repo                     = var.github_repo
  github_allowed_branches         = var.github_allowed_branches
  github_allowed_environments     = var.github_allowed_environments
  create_github_oidc_provider     = var.create_github_oidc_provider
  existing_github_oidc_provider_arn = var.existing_github_oidc_provider_arn

  frontend_repository_arn = module.ecr.frontend_repository_arn
  backend_repository_arn  = module.ecr.backend_repository_arn

  ecs_cluster_arn          = module.ecs_cluster.cluster_arn
  frontend_service_arn     = module.frontend_service.service_arn
  backend_service_arn      = module.backend_service.service_arn
  frontend_task_family     = module.frontend_service.task_family
  backend_task_family      = module.backend_service.task_family
  tags                     = local.common_tags
}

resource "aws_cloudwatch_metric_alarm" "alb_unhealthy_targets_frontend" {
  count = var.create_basic_alarms ? 1 : 0

  alarm_name          = "${local.name_prefix}-alb-frontend-unhealthy-targets"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "UnHealthyHostCount"
  namespace           = "AWS/ApplicationELB"
  period              = 60
  statistic           = "Average"
  threshold           = 0
  alarm_description   = "Alert when frontend target group has unhealthy hosts."
  treat_missing_data  = "notBreaching"

  dimensions = {
    TargetGroup  = module.alb.frontend_target_group_dimension_suffix
    LoadBalancer = module.alb.alb_dimension_suffix
  }

  alarm_actions = var.alarm_sns_topic_arn != "" ? [var.alarm_sns_topic_arn] : []
  ok_actions    = var.alarm_sns_topic_arn != "" ? [var.alarm_sns_topic_arn] : []
}

resource "aws_cloudwatch_metric_alarm" "alb_unhealthy_targets_backend" {
  count = var.create_basic_alarms ? 1 : 0

  alarm_name          = "${local.name_prefix}-alb-backend-unhealthy-targets"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "UnHealthyHostCount"
  namespace           = "AWS/ApplicationELB"
  period              = 60
  statistic           = "Average"
  threshold           = 0
  alarm_description   = "Alert when backend target group has unhealthy hosts."
  treat_missing_data  = "notBreaching"

  dimensions = {
    TargetGroup  = module.alb.backend_target_group_dimension_suffix
    LoadBalancer = module.alb.alb_dimension_suffix
  }

  alarm_actions = var.alarm_sns_topic_arn != "" ? [var.alarm_sns_topic_arn] : []
  ok_actions    = var.alarm_sns_topic_arn != "" ? [var.alarm_sns_topic_arn] : []
}

resource "aws_cloudwatch_metric_alarm" "ecs_frontend_running_tasks_low" {
  count = var.create_basic_alarms ? 1 : 0

  alarm_name          = "${local.name_prefix}-ecs-frontend-running-low"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 2
  metric_name         = "RunningTaskCount"
  namespace           = "ECS/ContainerInsights"
  period              = 60
  statistic           = "Average"
  threshold           = max(var.frontend_desired_count - 1, 0)
  alarm_description   = "Alert when frontend running task count drops below expected level."
  treat_missing_data  = "notBreaching"

  dimensions = {
    ClusterName = module.ecs_cluster.cluster_name
    ServiceName = module.frontend_service.service_name
  }

  alarm_actions = var.alarm_sns_topic_arn != "" ? [var.alarm_sns_topic_arn] : []
  ok_actions    = var.alarm_sns_topic_arn != "" ? [var.alarm_sns_topic_arn] : []
}

resource "aws_cloudwatch_metric_alarm" "ecs_backend_running_tasks_low" {
  count = var.create_basic_alarms ? 1 : 0

  alarm_name          = "${local.name_prefix}-ecs-backend-running-low"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 2
  metric_name         = "RunningTaskCount"
  namespace           = "ECS/ContainerInsights"
  period              = 60
  statistic           = "Average"
  threshold           = max(var.backend_desired_count - 1, 0)
  alarm_description   = "Alert when backend running task count drops below expected level."
  treat_missing_data  = "notBreaching"

  dimensions = {
    ClusterName = module.ecs_cluster.cluster_name
    ServiceName = module.backend_service.service_name
  }

  alarm_actions = var.alarm_sns_topic_arn != "" ? [var.alarm_sns_topic_arn] : []
  ok_actions    = var.alarm_sns_topic_arn != "" ? [var.alarm_sns_topic_arn] : []
}
