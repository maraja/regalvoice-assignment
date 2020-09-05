resource "aws_key_pair" "regalvoice-key" {
    key_name = "regalvoice-key"
    public_key = file("./regal_voice.pem")
}