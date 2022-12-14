/*
 * @Author: zyh
 * @Date: 2022-12-14 11:06:18
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-14 11:27:00
 * @FilePath: /ChargeAccount/app/controller/bill.js
 * @Description: bill Controller
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strick';

const { Controller } = require('egg');

class BillController extends Controller {
  async addBill() {
    const { ctx, app } = this;
    const { payType, amount, typeName, typeId, remark = '' } = ctx.request.body;
    if (!payType || !amount || !typeName || !typeId) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
      return;
    }
    const token = ctx.request.headers.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return; // 验证token失败
    try {
      const res = await ctx.service.bill.addBill({
        payType,
        amount,
        typeName,
        typeId,
        date: +new Date(),
        userId: decode.id,
        remark,
      });
      if (res) {
        ctx.body = {
          code: 200,
          msg: '请求成功',
          data: null,
        };
      } else {
        ctx.body = {
          code: 500,
          msg: '请求失败',
          data: null,
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }
}

module.exports = BillController;
