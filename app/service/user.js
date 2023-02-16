/*
 * @Author: zyh
 * @Date: 2022-12-12 18:55:55
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-15 16:31:05
 * @FilePath: /ChargeAccountEggNode/app/service/user.js
 * @Description: user Service
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

const { Service } = require('egg');

class UserService extends Service {
  // 获取用户信息
  async getUserInfo(username) {
    const { app } = this;
    try {
      const res = await app.mysql.get('user', { username });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 注册
  async register(params) {
    const { app } = this;
    try {
      const res = await app.mysql.insert('user', params);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 修改用户信息
  async editUserInfo(params) {
    const { app } = this;
    try {
      const res = await app.mysql.update('user', params, { id: params.id });
      return res;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  // 获取用户列表
  async getUserList(current, pageSize) {
    const { app } = this;
    console.log('page', current, pageSize);
    try {
      const res = await app.mysql.select('user', {
        // where: {
        //   username: ['like', `%${username}%`]
        // },
        // columns: ['username', 'id'], // 过滤表头
        // 分页
        limit: Number(pageSize),
        offset: (current - 1) * pageSize
      });
      const total = await app.mysql.count('user');
      return {
        list: res,
        current: Number(current),
        pageSize: Number(pageSize),
        total
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserService;
