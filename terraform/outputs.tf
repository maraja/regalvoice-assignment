output "regalvoice-backend-codedeploy-app-name" {
    value = module.regalvoice-backend-codedeploy.app-name
}

output "regalvoice-backend-deployment-bucket-name" {
    value = module.regalvoice-backend-codedeploy.deployment-bucket-name
}

output "regalvoice-backend-private-ip" {
    value = module.regalvoice-backend.private-ip
}

output "regalvoice-backend-public-ip" {
    value = aws_eip.regalvoice-backend-eip.public_ip
}

output "aws-region" {
    value = var.aws-region
}

output "regalvoice-backend-db-address" {
    value = module.regalvoice-backend-db.address
}

output "regalvoice-queue-address" {
    value = module.rabbitmq.rabbitmq_elb_dns
}

output "regalvoice-queue-admin-password" {
    value = module.rabbitmq.admin_password
}

# output "regalvoice-backend-private-ip" {
#     value = module.regalvoice-backend.private-ip
# }
