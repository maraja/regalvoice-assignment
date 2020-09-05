resource "aws_eip" "regalvoice-backend-eip" {
    instance = module.regalvoice-backend.instance-id
}

module "regalvoice-backend" {
    source = "./node-server"

    ami-id = "ami-054362537f5132ce2"
    iam-instance-profile = module.regalvoice-backend-codedeploy.iam-instance-profile
    key-pair = aws_key_pair.regalvoice-key.key_name
    name = "regalvoice-backend"
    subnet-id = aws_subnet.regalvoice-subnet-public.id
    vpc-security-group-ids = [
        aws_security_group.allow-http.id,
        aws_security_group.allow-ssh.id,
        aws_security_group.allow-all-outbound.id
    ]
}

module "rabbitmq" {
    source                            = "ulamlabs/rabbitmq/aws"
    version                           = "3.0.0"
    vpc_id                            = aws_vpc.regalvoice.id
    ssh_key_name                      = aws_key_pair.regalvoice-key.key_name
    subnet_ids                        = [aws_subnet.regalvoice-subnet-public.id]
    elb_additional_security_group_ids = [
        aws_security_group.allow-http.id,
        aws_security_group.allow-ssh.id,
        aws_security_group.allow-all-outbound.id
    ]
    instance_type = "t2.micro"
    min_size                          = "1"
    max_size                          = "1"
    desired_size                      = "1"
}

module "regalvoice-backend-codedeploy" {
    source = "./codedeploy-app"

    app-name = "regalvoice-backend"
    ec2-instance-name = module.regalvoice-backend.name
}

module "regalvoice-backend-db" {
    source = "./mysql-db"

    apply-immediately = true
    db-name = "db"
    db-subnet-group-name = aws_db_subnet_group.private.id
    identifier = "regalvoice-backend-db"
    password = var.regalvoice-backend-db-password
    publicly-accessible = false
    username = var.regalvoice-backend-db-username
    vpc-security-group-ids = [aws_security_group.allow-internal-mysql.id]

}