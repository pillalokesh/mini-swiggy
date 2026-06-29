SHELL := /bin/bash

.PHONY: tf-fmt tf-validate-dev tf-plan-dev tf-apply-dev tf-validate-prod tf-plan-prod tf-apply-prod

tf-fmt:
	terraform -chdir=infra fmt -recursive

tf-validate-dev:
	terraform -chdir=infra/envs/dev init -backend=false
	terraform -chdir=infra/envs/dev validate

tf-plan-dev:
	terraform -chdir=infra/envs/dev init -backend-config=backend.hcl
	terraform -chdir=infra/envs/dev plan -var-file=terraform.tfvars

tf-apply-dev:
	terraform -chdir=infra/envs/dev apply -var-file=terraform.tfvars

tf-validate-prod:
	terraform -chdir=infra/envs/prod init -backend=false
	terraform -chdir=infra/envs/prod validate

tf-plan-prod:
	terraform -chdir=infra/envs/prod init -backend-config=backend.hcl
	terraform -chdir=infra/envs/prod plan -var-file=terraform.tfvars

tf-apply-prod:
	terraform -chdir=infra/envs/prod apply -var-file=terraform.tfvars
