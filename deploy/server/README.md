## 在 cost-egg 项目的根目录下执行以下命令

### build

docker build --platform linux/arm64 -t server_charge_account:v1 .

> m1：docker buildx build --platform linux/amd64 -t server_charge_account:v1 .

### run

docker run --name server_charge_account -d -p 7001:7001 server_charge_account:v1
