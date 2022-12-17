/*
 * @Author: zyh
 * @Date: 2022-12-07 15:20:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-16 18:34:14
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
  // user
  router.post('/api/user/register', controller.user.register); // 注册
  router.post('/api/user/login', controller.user.login); // 登录
  router.get('/api/user/getUserInfo', _jwt, controller.user.getUserInfo); // 获取用户信息 把jwt放入第二个参数，作为中间件
  router.post('/api/user/editUserInfo', _jwt, controller.user.editUserInfo); // 修改用户信息

  // upload
  router.post('/api/upload', _jwt, controller.upload.upload); // 上传图片

  // bill
  router.post('/api/bill/addBill', _jwt, controller.bill.addBill); // 添加账单
  router.get('/api/bill/getBillList', _jwt, controller.bill.getBillList); // 获取账单列表
  router.get('/api/bill/getBillDetail', _jwt, controller.bill.getBillDetail); // 获取账单详情
  router.post('/api/bill/editBill', _jwt, controller.bill.editBill); // 修改账单
  router.post('/api/bill/deleteBill', _jwt, controller.bill.deleteBill); // 删除账单
  router.get('/api/bill/getBillChart', _jwt, controller.bill.getBillChart); // 获取账单图表')
};
