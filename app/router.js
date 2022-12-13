/*
 * @Author: zyh
 * @Date: 2022-12-07 15:20:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-13 15:44:46
 * @FilePath: /ChargeAccount/app/router.js
 * @Description: 路由配置
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // jwt验证中间件
  console.log('_jwt', _jwt);
  router.post('/api/user/register', controller.user.register); // 注册
  router.post('/api/user/login', controller.user.login); // 登录
};
