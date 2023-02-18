/*
 * @Author: zyh
 * @Date: 2022-12-07 15:20:23
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-18 19:04:52
 * @FilePath: /ChargeAccountEggNode/app/router.js
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
  router.get('/api/user/getUserList', _jwt, controller.user.getUserList); // 获取用户列表

  // role
  router.post('/api/role/addRole', _jwt, controller.role.addRole); // 添加角色
  router.get('/api/role/getRoleList', _jwt, controller.role.getRoleList); // 获取角色列表
  router.get('/api/role/getRolePermissions', _jwt, controller.role.getRolePermissions); // 获取用户对应的权限列表
  router.post('/api/role/editRoleInfo', _jwt, controller.role.editRoleInfo); // 修改角色信息

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
