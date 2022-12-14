/*
 * @Author: zyh
 * @Date: 2022-12-07 15:20:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-13 18:58:42
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
  router.post('/api/user/register', controller.user.register); // 注册
  router.post('/api/user/login', controller.user.login); // 登录
  router.get('/api/user/getUserInfo', _jwt, controller.user.getUserInfo); // 获取用户信息 把jwt放入第二个参数，作为中间件
  router.post('/api/user/editUserInfo', _jwt, controller.user.editUserInfo); // 修改用户信息
  router.post('/api/upload', _jwt, controller.upload.upload); // 上传图片
};
