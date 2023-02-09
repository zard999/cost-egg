#!/usr/bin/env sh

docker build --platform=linux/amd64 -t mysql_charge_account:v1 .
docker run --name=mysql_charge_account --env=MYSQL_ROOT_PASSWORD=xue19991202 --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --env=GOSU_VERSION=1.12 --env=MYSQL_MAJOR=5.7 --env=MYSQL_VERSION=5.7.32-1debian10 --volume=/usr/local/docker/mysql/logs:/var/log/mysql --volume=/usr/local/docker/mysql/data:/var/lib/mysql --volume=/usr/local/docker/mysql/conf:/etc/mysql --volume=/var/lib/mysql -p 33060:33060 --expose=33060 --restart=no --detach=true mysql_charge_account:v1 mysqld
