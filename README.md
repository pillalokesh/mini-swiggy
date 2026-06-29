# Mini App Infrastructure Foundation

This repository currently contains infrastructure and deployment automation for a production-style AWS setup for a full-stack restaurant ordering platform.

Start with:

- `infra/README.md` for architecture, bootstrap, DNS/OIDC setup, and operations.

Included deliverables:

- Terraform modules for networking, security, ECS, ALB, DNS, ACM, ECR, and GitHub OIDC IAM
- Separate environment entrypoints for dev and prod
- GitHub Actions workflows for frontend/backend deployments in dev/prod
- Terraform validation workflow
- Placeholder frontend/backend Dockerfiles for pipeline bootstrap
- ECS task definition templates

This phase intentionally does not implement business application features.
