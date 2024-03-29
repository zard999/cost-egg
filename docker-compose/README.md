## 流程

> m1 需要加上：buildx 和 --platform linux/amd64

1. 构建 mysql_charge_account

```bash
cd /deploy/mysql
docker build -t mysql_charge_account:v1 .
docker tag mysql_charge_account:v1 registry.cn-shenzhen.aliyuncs.com/zard999/mysql_charge_account
docker push registry.cn-shenzhen.aliyuncs.com/zard999/mysql_charge_account
```

2. 构建 server_charge_account

```bash
cd /
docker build -t server_charge_account:v1 .
docker tag server_charge_account:v1 registry.cn-shenzhen.aliyuncs.com/zard999/server_charge_account
docker push registry.cn-shenzhen.aliyuncs.com/zard999/server_charge_account
```

3. 构建 react_admin

```bash
  https://github.com/zard999/react-admin
```

4. 运行 docker-compose

```bash
docker-compose up -d
```

```
# 登录远端
echo "plasma"|docker login ** -u plasma --password-stdin

# 本地镜像打tag
docker tag **

# push
docker push **

# pull
docker pull **

# 启动 docker-compose
docker-compose up -d

# 打包镜像
docker build -t
# 启动运行容器
docker run --name mysql_charge_account -d -p 80:80 mysql_charge_account:v1
```
