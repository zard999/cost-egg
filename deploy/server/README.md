## 在 cost-egg 项目的根目录下执行以下命令

### build

docker build -t server_charge_account:v1 .

### run

docker run --name server_charge_account -d -p 7001:7001 server_charge_account:v1
