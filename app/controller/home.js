/*
 * @Author: zyh
 * @Date: 2022-12-07 15:20:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-12 11:48:45
 * @FilePath: /ChargeAccount/app/controller/home.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
 */
'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  // async index() {
  //   const { ctx } = this;
  //   const { id } = ctx.query;
  //   ctx.body = id;
  // }
  // 模版
  async index() {
    const { ctx } = this;
    // ctx.render 默认会去 view 文件夹寻找 index.html, 这是egg约定好的
    await ctx.render('index.html', {
      title: '我是张永辉' // 将title传递给 index.html
    })
  }
  // 获取用户信息
  // async user() {
  //   const { ctx } = this;
  //   const { id } = ctx.params;
  //   ctx.body = id;
  // }
  // 从server获取用户信息
  // async user() {
  //   const { ctx } = this;
  //   console.log('ctx', ctx.service.home);
  //   const { name, slogen } = await ctx.service.home.user();
  //   ctx.body = {
  //     name,
  //     slogen
  //   }
  // }
  // 从数据库中获取用户信息
  async user() {
    const { ctx } = this;
    const res = await ctx.service.home.user();
    console.log('ctx', res);
    ctx.body = res;
  }
  // 向数据库中添加用户信息
  async addUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    try {
      const res = await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null
      } 
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null
      } 
    }
  }
  // 向数据库中编辑用户信息
  async editUser() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;
    try {
      const res = await ctx.service.home.editUser(id, name);
      ctx.body = {
        code: 200,
        msg: '编辑成功',
        data: null
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '编辑失败',
        data: null
      }
    }
  }
  // 向数据库中删除用户信息
  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    console.log('id', id);
    if (!id) return ctx.body = { code: 500, msg: 'id不能为空', data: null };
    try {
      const res = await ctx.service.home.deleteUser(id);
      ctx.body = {
        code: 200,
        msg: '删除成功',
        data: null
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '删除失败',
        data: null
      }
    }
  }
  // 添加用户
  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    ctx.body = {
      title,
    }
  }
}

module.exports = HomeController;
