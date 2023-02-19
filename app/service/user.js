/*
 * @Author: zyh
 * @Date: 2022-12-12 18:55:55
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-19 23:25:04
 * @FilePath: /ChargeAccountEggNode/app/service/user.js
 * @Description: user Service
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

const { Service } = require('egg');
const { objArrChangeString } = require('../extend/helper');

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
    const { app, ctx } = this;
    try {
      // 先修改用户表中的信息
      const res = await app.mysql.query('update user set username = ?, password = ? where id = ?', [
        params.username,
        params.password,
        params.id
      ]);
      // 根据id查询绑定的角色列表
      const roleList = await ctx.service.role.getRoleInfoByUserId(params.id);
      // 首先得判断roleList和params.roleName的长度
      if (roleList.length > params.roleName.length) {
        // 则代表需要删除某些角色
        // 根据roleList找出需要删除的roleName
        const deleteRoleNameList = roleList.filter(item => !params.roleName.includes(item));
        // 将数组转换成字符串
        const roleNameString = objArrChangeString(deleteRoleNameList);
        // 根据角色名查询角色id信息
        const roleIdInfo = await app.mysql.query(`select id from role where roleName in ('${roleNameString}')`);
        // 将查询出来的角色id信息转换成字符串
        const roleIds = objArrChangeString(roleIdInfo, 'id');
        // 根据角色id删除用户角色表中的数据
        await app.mysql.query(`delete from user_roles where user_id = ${params.id} and role_id in ('${roleIds}')`);
        console.log('resDel', roleList, params, deleteRoleNameList, roleNameString, roleIds);
      } else if (roleList.length < params.roleName.length) {
        // 则代表需要添加某些角色
        // 根据params.roleName找出需要添加的roleName
        const addRoleNameList = params.roleName.filter(item => !roleList.includes(item));
        // 将数组转换成字符串
        const roleNameString = objArrChangeString(addRoleNameList);
        // 根据角色名查询角色id
        const roleIdInfo = await app.mysql.query(`select id from role where roleName in ('${roleNameString}')`);
        // 向用户角色表中插入数据
        const date = +new Date();
        await ctx.service.role.addUserRole({
          user_id: params.id,
          role_id: roleIdInfo.map(item => item.id),
          created_at: date,
          updated_at: date
        });
      } else {
        // 则不用做任何角色操作
      }
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
