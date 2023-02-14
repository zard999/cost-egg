# ChargeAccount

account money

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org

### 目录结构

- app/controller - 用于解析用户的输入，处理后返回相应的结果
- app/service - 用于编写业务逻辑层(用于数据库的查询)
- app/middleware - 用于编写中间件（也可以在 Controller 中判断当前请求是否携带有效的用户认证信息，接口一多，到处都是这样的判断，逻辑重复，中间件在某种程度上，也算是优化代码结构的一种方式）
- app/public - 用于放置静态资源(图片，文本文档，excel，word 等)
- config/config.default.js - 用于编写配置文件
- config/plugin.js - 用于配置需要加载的插件(比如 egg-mysql、egg-cors、egg-jwt 等官方提供的插件)

### 连接 mysql8.0 以上报错

```mysql
CREATE USER 'test2'@'%' IDENTIFIED WITH mysql_native_password BY '66668888';

GRANT ALL PRIVILEGES ON *.* TO 'test2'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
```
