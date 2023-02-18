/*
 * @Author: zyh
 * @Date: 2023-02-17 15:09:36
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-18 19:04:21
 * @FilePath: /ChargeAccountEggNode/app/service/role.js
 * @Description: 角色服务
 *
 * Copyright (c) 2023 by 穿越, All Rights Reserved.
 */
const { Service } = require('egg');

class RoleService extends Service {
  // 添加角色
  async addRole(params) {
    const { app } = this;
    try {
      const res = await app.mysql.insert('role', params);
      return res;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  // 向用户角色表中添加数据
  async addUserRole(params) {
    const { app } = this;
    try {
      const res = await app.mysql.insert('user_roles', params);
      return res;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  // 获取角色列表
  async getRoleList(current, pageSize) {
    const { app } = this;
    console.log('page', current, pageSize);
    try {
      // * 判断是否分页
      if (!current || !pageSize) {
        const res = await app.mysql.select('role', {
          columns: ['id', 'roleName'] // 过滤表头
        });
        return res;
      }
      const res = await app.mysql.select('role', {
        // where: {
        //   username: ['like', `%${username}%`]
        // },
        // 分页
        limit: Number(pageSize),
        offset: (current - 1) * pageSize
      });
      const total = await app.mysql.count('role');
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

  // 查询角色信息
  async getRoleInfo(params) {
    const { app } = this;
    try {
      const res = await app.mysql.get('role', params);
      console.log('getRoleInfo', res, params);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 获取用户权限信息
  async getRolePermissions(user_id) {
    const { app } = this;
    try {
      // 通过用户id获取角色id
      const userRolesInfo = await app.mysql.get('user_roles', {
        user_id
      });
      if (!userRolesInfo) return { permissions: [] };
      // 通过角色id查询角色权限
      const roleInfo = await app.mysql.get('role', {
        id: userRolesInfo.role_id
      });
      console.log('getRolePermissions', roleInfo);
      return {
        permissions: JSON.parse(roleInfo.permissions)
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 修改角色信息
  async editRoleInfo(params) {
    const { app } = this;
    try {
      const res = await app.mysql.update('role', params);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = RoleService;
