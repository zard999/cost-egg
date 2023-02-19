/*
 * @Author: zyh
 * @Date: 2022-12-12 18:52:44
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-19 21:36:05
 * @FilePath: /ChargeAccountEggNode/app/controller/user.js
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
    const { username, password, roleName } = ctx.request.body;
    console.log('username', username, password, roleName);
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '用户名或密码不能为空',
        data: null
      };
    }
    if (!roleName) {
      ctx.body = {
        code: 500,
        msg: '角色不能为空',
        data: null
      };
    }
    try {
      const userInfo = await ctx.service.user.getUserInfo(username); // 获取用户信息
      // console.log('userInfo', userInfo, userInfo.id);
      if (userInfo && userInfo.id) {
        ctx.body = {
          code: 500,
          msg: '用户名已存在，请重新注册',
          data: null
        };
        return;
      }
      // 向数据库中插入注册数据
      const res = await ctx.service.user.register({
        username,
        password,
        signature: '这个人很懒，什么都没有留下',
        avatar: defaultAvatar,
        ctime: +new Date()
      });
      // 再次获取用户信息
      const userInfo2 = await ctx.service.user.getUserInfo(username);
      // 通过roleName查询roleId
      const roleInfo = await ctx.service.role.getRoleInfo(roleName);
      // 向用户角色表中插入数据
      const date = +new Date();
      await ctx.service.role.addUserRole({
        user_id: userInfo2.id,
        role_id: roleInfo.map(item => item.id),
        created_at: date,
        updated_at: date
      });
      if (res) {
        ctx.body = {
          code: 200,
          msg: '新增用户成功',
          data: null
        };
      } else {
        ctx.body = {
          code: 500,
          msg: '新增用户失败',
          data: null
        };
      }
    } catch (error) {
      console.log('error', error);
      ctx.body = {
        code: 500,
        msg: '新增用户失败',
        data: null
      };
    }
  }

  // 登录
  async login() {
    // app 是全局上下文中的一个属性，config/plugin.js中挂载的插件，可以通过app.xxx获取
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '用户名或密码不能为空',
        data: null
      };
      return;
    }
    try {
      // 1. 查询用户是否存在
      const userInfo = await ctx.service.user.getUserInfo(username);
      if (!userInfo || !userInfo.id) {
        ctx.body = {
          code: 500,
          msg: '用户不存在，请先注册!!!',
          data: null
        };
        return;
      }
      // 2. 用户存在，验证密码是否正确
      if (userInfo && password !== userInfo.password) {
        ctx.body = {
          code: 500,
          msg: '密码错误，请重新输入!!!',
          data: null
        };
        return;
      }
      // 3. 密码正确，生成token
      const token = app.jwt.sign(
        {
          username,
          id: userInfo.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // token有效期为24小时
        },
        app.config.jwt.secret
      );
      ctx.body = {
        code: 200,
        msg: '登录成功',
        data: {
          token,
          id: userInfo.id,
          username: userInfo.username,
          signature: userInfo.signature,
          avatar: userInfo.avatar
        }
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '登录失败',
        data: null
      };
    }
  }

  // 获取用户信息
  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    // 通过app.jwt.verify方法和app.config.secret解密token
    const decode = app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return;
    try {
      const userInfo = await ctx.service.user.getUserInfo(decode.username);
      if (userInfo && userInfo.id) {
        ctx.body = {
          code: 200,
          msg: '请求成功',
          data: {
            id: userInfo.id,
            username: userInfo.username,
            signature: userInfo.signature,
            avatar: userInfo.avatar
          }
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '获取用户信息失败',
        data: null
      };
    }
  }

  // 修改用户信息
  async editUserInfo() {
    const { ctx, app } = this;
    const { signature = '' } = ctx.request.body;
    try {
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const userInfo = await ctx.service.user.getUserInfo(decode.username);
      if (userInfo && userInfo.id) {
        const res = await ctx.service.user.editUserInfo({
          ...userInfo,
          signature
        });
        if (res) {
          ctx.body = {
            code: 200,
            msg: '修改成功',
            data: null
          };
        } else {
          ctx.body = {
            code: 500,
            msg: '修改失败',
            data: null
          };
        }
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '修改失败',
        data: null
      };
    }
  }

  // 获取用户列表
  async getUserList() {
    const { ctx } = this;
    const { current = 1, pageSize = 10 } = ctx.request.query;
    console.log('getUserList', ctx.request.query);
    try {
      const res = await ctx.service.user.getUserList(current, pageSize);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: res
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '获取用户列表失败',
        data: null
      };
    }
  }

  // 根据用户id查询当前用户绑定的角色
  async getRoleInfoByUserId() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    try {
      const res = await ctx.service.role.getRoleInfoByUserId(id);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: res
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '获取用户列表失败',
        data: null
      };
    }
  }
}

module.exports = UserController;
