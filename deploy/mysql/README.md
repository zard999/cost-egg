## mysql 备份

- 备份数据库：mysqldump -u root -h 42.192.151.130 -p cost >~/Desktop/init.sql
- 备份数据库中某个表：mysqldump -u root -h 42.192.151.130 -p cost user >~/Desktop/user.sql

## 在宿主机上的这个目录执行相关 docker build 命令

### build

- docker build -t mysql_charge_account:v1 .

> m1 芯片命令：docker buildx build -t mysql_charge_account:v1 --platform=linux/amd64 .

### run

<!-- 自定义mysql_charge_account, 完美使用 -->

docker run --name=mysql_charge_account --env=MYSQL_ROOT_PASSWORD=xue19991202 --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbibin --env=GOSU_VERSION=1.12 --env=MYSQL_MAJOR=8.0 --env=MYSQL_VERSION=8.0.31-1debian10 --volume=/project/cost/mysql/log:/var/log/mysql --volume=/project/cost/mysql/data:/var/lib/mysql --volume=/project/cost/mysql/conf:/etc/mysql/conf.d -p 33060:3306 --expose=33060 --privileged=true --restart=no --detach=true mysql_charge_account:v1 mysqld

- --privileged=true：容器数据卷模式开启

> mac 需要加上--platform=linux/amd64
> 挂载目录需要使用绝对路径
> /project/cost/mysql 为自己创建的目录绝对路径；需要在创建/project/cost/mysql/conf/\*.cnf 文件，否则会报错，内容如下：port 修改了，33060:3306（后面的 3306 对应容器里面的也需要修改）

```bash
[mysqld]
port=3306
init-connect="SET collation_connection=utf8mb4_0900_ai_ci"
init_connect="SET NAMES utf8mb4"
skip-character-set-client-handshake
```

## 检验是否成功

### 使用数据库可视化工具连接数据库，至于之前的数据库如何全部转移，可以通过 navicat 进行操作.
