/*
 * @Author: zyh
 * @Date: 2022-12-07 15:20:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-12 16:43:21
 * @FilePath: /ChargeAccount/app/controller/home.js
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  // 从数据库中获取用户信息
  async user() {
    const { ctx } = this;
    const res = await ctx.service.home.user();
    console.log('user', res);
    ctx.body = res;
  }
  // 向数据库中添加用户信息
  async addUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    try {
      await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null,
      };
    }
  }
  // 向数据库中编辑用户信息
  async editUser() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;
    try {
      await ctx.service.home.editUser(id, name);
      ctx.body = {
        code: 200,
        msg: '编辑成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '编辑失败',
        data: null,
      };
    }
  }
  // 向数据库中删除用户信息
  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) {
      ctx.body = { code: 500, msg: 'id不能为空', data: null };
      return;
    }
    try {
      await ctx.service.home.deleteUser(id);
      ctx.body = {
        code: 200,
        msg: '删除成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '删除失败',
        data: null,
      };
    }
  }
}

module.exports = HomeController;
