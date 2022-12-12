/*
 * @Author: zyh
 * @Date: 2022-12-07 16:01:52
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-12 11:49:49
 * @FilePath: /ChargeAccount/app/service/home.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
 */
'use strict'

const Service = require('egg').Service;

class HomeService extends Service {
  // async user() {
  //   // 假设从数据库获取用户信息
  //   return {
  //     name: '嘎子',
  //     slogen: '网络的世界太虚伪，你把握不住'
  //   }
  // }
  // 从数据库中获取用户信息
  async user() {
    const { ctx, app } = this;
    const QUERY_STR = 'id, name';
    let sql = `select ${QUERY_STR} from list`; // 获取 id 的 sql 语句
    try {
      // mysql实例已经挂载到app上了，可以直接通过app.mysql来访问
      const res = await app.mysql.query(sql);
      return res; 
    } catch (error) {
      console.log(error); 
      return null;
    }
  }
  // 从数据库中新增用户信息
  async addUser(name) {
    const { ctx, app } = this;
    try {
      // 给list表新增一条数据
      const result = await app.mysql.insert('list', { name}) 
      return result;
    } catch (error) {
      console.log(error); 
      return null; 
    }
  }
  // 从数据库中编辑用户信息
  async editUser(id, name) {
    const { ctx, app } = this;
    try {
      let res = await app.mysql.update('list', { name }, {
        where: {
          id
        }
      })
      return res;
    } catch (error) {
      console.log(error); 
      return null;  
    }
  }
  // 从数据库中删除用户信息
  async deleteUser(id) {
    const { ctx, app } = this;
    try {
      let res = await app.mysql.delete('list', {
        id
      })
      return res;
    } catch (error) {
      console.log(error); 
      return null;  
    }  
  }
}

module.exports = HomeService;
