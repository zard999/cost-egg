/*
 * @Author: zyh
 * @Date: 2022-12-12 18:55:55
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-20 14:42:54
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

  /**
   * @description 编辑用户信息
   * @param {*} params id, username, password, roleName
   * @returns
   */
  async editUserInfo(params) {
    const { app, ctx } = this;
    try {
      // 先修改用户表中的信息
      const res = await app.mysql.query('update user set username = ?, password = ? where id = ?', [
        params.username,
        params.password,
        params.id
      ]);
      // 根据id查询上一次绑定的角色列表
      const roleNameList = await ctx.service.role.getRoleInfoByUserId(params.id);
      // 判断查询出来的角色列表是否有长度，如果有，则需要判断是否需要删除或者添加，如果没有，则证明是第一次绑定角色
      if (roleNameList.length) {
        // 首先过滤掉公共的角色名
        // eslint-disable-next-line array-callback-return
        const roleNameFilterList = [...new Set([...roleNameList, ...params.roleName])].filter(item => {
          if (!roleNameList.includes(item) || !params.roleName.includes(item)) {
            return item;
          }
        });
        // 判断去重后的数组是否有长度，如果有，则证明相对于之前绑定的角色有变化，如果没有，则不需要做任何操作
        if (roleNameFilterList.length) {
          // 需要增加的角色名数组
          const addRoleNameList = [];
          // 需要删除的角色名数组
          const deleteRoleNameList = [];
          // 如果有长度，则代表需要增加或删除用户角色表中的数据
          roleNameFilterList.forEach(async item => {
            // 如果item在params.roleName中存在，则代表需要删除
            if (!params.roleName.includes(item)) {
              deleteRoleNameList.push(item);
            }
            if (!roleNameList.includes(item)) {
              // 如果item在roleNameList中存在，则代表需要添加
              addRoleNameList.push(item);
            }
          });
          // 则代表需要添加某些角色
          if (addRoleNameList.length > 0) {
            // 根据角色名查询角色id
            const roleIdInfo = await app.mysql.select('role', {
              where: {
                roleName: addRoleNameList
              }
            });
            // 向用户角色表中插入数据
            const date = +new Date();
            await ctx.service.role.addUserRole({
              user_id: params.id,
              role_id: roleIdInfo.map(item => item.id),
              created_at: date,
              updated_at: date
            });
            console.log('resAdd', roleIdInfo, roleNameFilterList);
          }
          // 则代表需要删除某些角色
          if (deleteRoleNameList.length > 0) {
            // 根据角色名查询角色id信息
            const roleIdInfo = await app.mysql.select('role', {
              where: {
                roleName: deleteRoleNameList
              }
            });
            // 将查询出来的角色id信息转换成字符串
            const roleIds = objArrChangeString(roleIdInfo, 'id');
            // 根据角色id删除用户角色表中的数据
            await app.mysql.query(`delete from user_roles where user_id = ${params.id} and role_id in (${roleIds})`);
            console.log('resDel', params, deleteRoleNameList, roleIdInfo, roleIds, roleNameFilterList);
          }
          return res;
        }
      }
      // 则代表第一次添加角色
      // 根据角色名查询角色id
      const roleIdInfo = await app.mysql.select('role', {
        where: {
          roleName: params.roleName
        }
      });
      // 向用户角色表中插入数据
      const date = +new Date();
      await ctx.service.role.addUserRole({
        user_id: params.id,
        role_id: roleIdInfo.map(item => item.id),
        created_at: date,
        updated_at: date
      });
      console.log('resAdd2', params.roleName, roleNameList, roleIdInfo, roleNameList);
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
