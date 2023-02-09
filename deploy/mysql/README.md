## mysql 备份

- 备份数据库：mysqldump -u root -h 42.192.151.130 -p cost >~/Desktop/init.sql
- 备份数据库中某个表：mysqldump -u root -h 42.192.151.130 -p cost user >~/Desktop/user.sql

- 注意： /usr/local/docker/mysql/conf my.cnf 需要拷贝到这里

## 在宿主机上的这个目录执行相关 docker build 命令

### before sql

```
CREATE DATABASE `pre_labels`;

use `pre_labels`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

```

### build

- docker build -t mysql_charge_account:v1 .

> m1 芯片命令：docker build --platform=linux/amd64 -t mysql_charge_account:v1 .

### run

<!-- 自定义mysql_charge_account, 完美使用 -->

docker run --name=mysql_charge_account --env=MYSQL_ROOT_PASSWORD=xue19991202 --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --env=GOSU_VERSION=1.12 --env=MYSQL_MAJOR=8.0 --env=MYSQL_VERSION=8.0.31-1debian10 -p 33060:3306 --expose=33060 --restart=no --detach=true mysql_charge_account:v1 mysqld

> mac 需要加上--platform=linux/amd64

## 检验是否成功

### 使用数据库可视化工具连接数据库，至于之前的数据库如何全部转移，可以通过 navicat 进行操作.
