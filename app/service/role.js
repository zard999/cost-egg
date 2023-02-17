/*
 * @Author: zyh
 * @Date: 2023-02-17 15:09:36
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-17 18:05:46
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

  // 获取角色列表
  async getRoleList(current, pageSize) {
    const { app } = this;
    console.log('page', current, pageSize);
    try {
      const res = await app.mysql.select('role', {
        // where: {
        //   username: ['like', `%${username}%`]
        // },
        columns: ['id', 'roleName', 'description', 'ctime'], // 过滤表头
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
}
module.exports = RoleService;
