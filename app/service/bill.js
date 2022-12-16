/*
 * @Author: zyh
 * @Date: 2022-12-14 11:13:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-16 17:15:52
 * @FilePath: /ChargeAccount/app/service/bill.js
 * @Description: bill Service
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

const { Service } = require('egg');
class BillService extends Service {
  // 添加账单
  async addBill(params) {
    const { app } = this;
    try {
      const res = await app.mysql.insert('bill', params);
      return res;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  // 获取账单列表
  async getBillList(userId) {
    const { app } = this;
    const QUERY_STR = 'id, payType, amount, typeName, typeId, date, remark';
    const sql = `select ${QUERY_STR} from bill where userId = ${userId}`;
    try {
      const res = await app.mysql.query(sql);
      console.log('getBillList', res);
      return res;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  // 获取账单详情
  async getBillDetail(id) {
    const { app } = this;
    const QUERY_STR = 'id, payType, amount, typeName, typeId, date, remark';
    const sql = `select ${QUERY_STR} from bill where id = ${id}`;
    try {
      const res = app.mysql.query(sql);
      return res;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  // 编辑账单
  async editBill(params) {
    const { app } = this;
    try {
      const res = await app.mysql.update('bill', { ...params });
      return res;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }
}

module.exports = BillService;
