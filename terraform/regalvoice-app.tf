resource "aws_s3_bucket" "regalvoice-app" {
    bucket = "amitmaraj-regalvoice-app"
    acl = "public-read"
    policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": ["arn:aws:s3:::amitmaraj-regalvoice-app/*"]
        }
    ]
}
POLICY

    website {
        index_document = "index.html"
        error_document = "index.html"
    }
}