resource "aws_s3_bucket" "deploy-bucket" {
    bucket = "amitmaraj-${var.app-name}-deployment"
}