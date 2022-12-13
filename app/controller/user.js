/*
 * @Author: zyh
 * @Date: 2022-12-12 18:52:44
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-13 14:49:36
 * @FilePath: /ChargeAccount/app/controller/user.js
 * @Description: user Controller
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

const { Controller } = require('egg');
// 默认头像
const defaultAvatar = 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png';

class UserController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    console.log('username', username, password);
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '用户名或密码不能为空',
        data: null,
      };
    }
    try {
      const userInfo = await ctx.service.user.getUserInfo(username); // 获取用户信息
      console.log('userInfo', userInfo, userInfo.id);
      if (userInfo && userInfo.id) {
        ctx.body = {
          code: 500,
          msg: '用户名已存在，请重新注册',
          data: null,
        };
        return;
      }
      // 向数据库中插入注册数据
      const res = await ctx.service.user.register({
        username,
        password,
        signature: '这个人很懒，什么都没有留下',
        avatar: defaultAvatar,
        ctime: +new Date(),
      });
      if (res) {
        ctx.body = {
          code: 200,
          msg: '注册成功',
          data: null,
        };
      } else {
        ctx.body = {
          code: 500,
          msg: '注册失败',
          data: null,
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
      };
    }
  }
}

module.exports = UserController;
