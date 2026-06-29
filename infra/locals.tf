locals {
  name_prefix = "${var.project_name}-${var.environment}"

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = var.owner
  }

  selected_route53_zone_id = var.route53_zone_id != "" ? var.route53_zone_id : (
    length(data.aws_route53_zone.selected) > 0 ? data.aws_route53_zone.selected[0].zone_id : null
  )
}

data "aws_route53_zone" "selected" {
  count = var.route53_zone_id == "" && var.route53_zone_name != "" ? 1 : 0

  name         = var.route53_zone_name
  private_zone = false
}
