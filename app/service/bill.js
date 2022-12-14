/*
 * @Author: zyh
 * @Date: 2022-12-14 11:13:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-14 11:15:02
 * @FilePath: /ChargeAccount/app/service/bill.js
 * @Description: bill Service
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

const { Service } = require('egg');

class BillService extends Service {
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
}

module.exports = BillService;
