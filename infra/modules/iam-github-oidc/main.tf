locals {
  oidc_provider_arn = var.create_github_oidc_provider ? aws_iam_openid_connect_provider.github[0].arn : var.existing_github_oidc_provider_arn

  repo_sub_claims = [
    for branch in var.github_allowed_branches : "repo:${var.github_org}/${var.github_repo}:ref:refs/heads/${branch}"
  ]

  env_sub_claims = [
    for env_name in var.github_allowed_environments : "repo:${var.github_org}/${var.github_repo}:environment:${env_name}"
  ]

  allowed_sub_claims = distinct(concat(local.repo_sub_claims, local.env_sub_claims))
}

resource "aws_iam_openid_connect_provider" "github" {
  count = var.create_github_oidc_provider ? 1 : 0

  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1"
  ]

  tags = merge(var.tags, {
    Name      = "${var.name_prefix}-github-oidc"
    Component = "iam"
  })
}

data "aws_iam_policy_document" "github_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Federated"
      identifiers = [local.oidc_provider_arn]
    }

    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = local.allowed_sub_claims
    }
  }
}

resource "aws_iam_role" "github_actions_deploy" {
  name               = "${var.name_prefix}-github-actions-deploy-role"
  assume_role_policy = data.aws_iam_policy_document.github_assume_role.json

  tags = merge(var.tags, {
    Name      = "${var.name_prefix}-github-actions-deploy-role"
    Component = "iam"
  })
}

data "aws_iam_policy_document" "deploy_permissions" {
  statement {
    sid    = "ECRAuth"
    effect = "Allow"

    actions = [
      "ecr:GetAuthorizationToken"
    ]

    resources = ["*"]
  }

  statement {
    sid    = "ECRPushPullSpecificRepos"
    effect = "Allow"

    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:CompleteLayerUpload",
      "ecr:InitiateLayerUpload",
      "ecr:PutImage",
      "ecr:UploadLayerPart",
      "ecr:BatchGetImage",
      "ecr:GetDownloadUrlForLayer",
      "ecr:DescribeRepositories",
      "ecr:DescribeImages"
    ]

    resources = [
      var.frontend_repository_arn,
      var.backend_repository_arn
    ]
  }

  statement {
    sid    = "ECSUpdateServicesAndTasks"
    effect = "Allow"

    actions = [
      "ecs:DescribeServices",
      "ecs:UpdateService",
      "ecs:DescribeTaskDefinition",
      "ecs:RegisterTaskDefinition",
      "ecs:DescribeTasks",
      "ecs:ListTasks",
      "ecs:TagResource"
    ]

    resources = ["*"]
  }

  statement {
    sid    = "PassTaskRoles"
    effect = "Allow"

    actions = [
      "iam:PassRole"
    ]

    resources = [
      "arn:aws:iam::${var.aws_account_id}:role/${var.name_prefix}-frontend-*",
      "arn:aws:iam::${var.aws_account_id}:role/${var.name_prefix}-backend-*"
    ]
  }

  statement {
    sid    = "ReadInfraMetadata"
    effect = "Allow"

    actions = [
      "elasticloadbalancing:Describe*",
      "logs:DescribeLogGroups",
      "logs:DescribeLogStreams",
      "cloudwatch:DescribeAlarms",
      "ssm:GetParameter",
      "ssm:GetParameters",
      "secretsmanager:GetSecretValue"
    ]

    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "deploy_permissions" {
  name   = "${var.name_prefix}-github-actions-deploy-policy"
  role   = aws_iam_role.github_actions_deploy.id
  policy = data.aws_iam_policy_document.deploy_permissions.json
}
