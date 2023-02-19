/*
 * @Author: zyh
 * @Date: 2023-02-17 15:09:36
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-19 22:44:08
 * @FilePath: /ChargeAccountEggNode/app/service/role.js
 * @Description: 角色服务
 *
 * Copyright (c) 2023 by 穿越, All Rights Reserved.
 */
const { Service } = require('egg');
const { objArrChangeString } = require('../extend/helper');

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
    let res = null;
    try {
      // 向user_roles表中插入多条数据
      if (params.role_id.length > 1) {
        params.role_id.forEach(async item => {
          res = await app.mysql.insert('user_roles', {
            ...params,
            role_id: item
          });
        });
      } else {
        res = await app.mysql.insert('user_roles', params);
      }
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
  async getRoleInfo(roleName) {
    const { app } = this;
    console.log('isArray', Array.isArray(roleName));
    try {
      // 查询role表中roleName为超级管理员和测试的角色数据
      const res = await app.mysql.select('role', {
        where: {
          roleName
        }
      });
      console.log('getRoleInfo', res);
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

  // 根据用户id查询当前用户绑定的角色
  async getRoleInfoByUserId(user_id) {
    const { app } = this;
    try {
      const res = await app.mysql.query('select * from user_roles where user_id = ?', [user_id]);
      // 通过返回的role_id数组查询角色信息
      const res2 = objArrChangeString(res, 'role_id');
      // res.reduce((pre, cur, index) => {
      //   if (index === res.length - 1) {
      //     return pre + cur.role_id;
      //   }
      //   return pre + cur.role_id + ',';
      // }, '');
      const roleInfo = await app.mysql.query(`select * from role where id in (${res2})`);
      console.log('getRoleInfoByUserId', res2, roleInfo);
      return roleInfo.map(item => item.roleName);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = RoleService;
