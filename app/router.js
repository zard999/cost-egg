/*
 * @Author: zyh
 * @Date: 2022-12-07 15:20:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-12 16:06:37
 * @FilePath: /ChargeAccount/app/router.js
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/user', controller.home.user);
  router.post('/addUser', controller.home.addUser);
  router.post('/editUser', controller.home.editUser);
  router.post('/deleteUser', controller.home.deleteUser);
};
