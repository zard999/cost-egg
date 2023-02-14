### .keep

- .keep 文件是为了占位

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
