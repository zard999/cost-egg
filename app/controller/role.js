/*
 * @Author: zyh
 * @Date: 2023-02-17 14:59:11
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-17 18:03:32
 * @FilePath: /ChargeAccountEggNode/app/controller/role.js
 * @Description: 角色管理
 *
 * Copyright (c) 2023 by 穿越, All Rights Reserved.
 */
const { Controller } = require('egg');

class RoleController extends Controller {
  // 添加角色
  async addRole() {
    const { ctx, app } = this;
    const { roleName, description, permissions } = ctx.request.body;
    if (!roleName || !description || !permissions) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      };
      return;
    }
    const token = ctx.request.headers.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return; // 验证token失败
    try {
      const res = await ctx.service.role.addRole({
        roleName,
        description,
        permissions: JSON.stringify(permissions),
        ctime: +new Date()
      });
      if (res) {
        ctx.body = {
          code: 200,
          msg: '请求成功',
          data: null
        };
      } else {
        ctx.body = {
          code: 500,
          msg: '请求失败',
          data: null
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      };
      return;
    }
  }

  // 获取角色列表
  async getRoleList() {
    const { ctx } = this;
    const { current = 1, pageSize = 10 } = ctx.request.query;
    console.log('getRoleList', ctx.request.query);
    try {
      const res = await ctx.service.role.getRoleList(current, pageSize);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: res
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '获取角色列表失败',
        data: null
      };
    }
  }
}

module.exports = RoleController;
