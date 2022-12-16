/*
 * @Author: zyh
 * @Date: 2022-12-14 11:06:18
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-16 16:36:27
 * @FilePath: /ChargeAccount/app/controller/bill.js
 * @Description: bill Controller
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strick';

const { Controller } = require('egg');
const moment = require('moment');

class BillController extends Controller {
  // 添加账单
  async addBill() {
    const { ctx, app } = this;
    const { payType, amount, typeName, typeId, remark = '' } = ctx.request.body;
    if (!payType || !amount || !typeName || !typeId) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
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
        remark
      });
      if (res) {
        ctx.body = {
          code: 200,
          msg: '请求成功',
          data: null
        };
      } else {
        ctx.body = {
          code: 500,
          msg: '请求失败',
          data: null
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      };
    }
  }

  // 获取账单列表
  async getBillList() {
    const { ctx, app } = this;
    const { date, page = 1, pageSize = 5, typeId = 'all' } = ctx.request.body;
    try {
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return; // 验证token失败

      // 获取当前用户的账单列表
      const list = await ctx.service.bill.getBillList(decode.id);
      if (!list || !list.length) {
        ctx.body = {
          code: 200,
          msg: '请求成功',
          data: {
            list: [],
            totalPage: 0, // 总页数
            totalExpense: 0, // 总支出
            totalIncome: 0 // 总收入
          }
        };
        return;
      }

      // 过滤出月份和类型所对应的账单列表
      const _list = list.filter(item => {
        if (typeId !== 'all') {
          return moment(Number(item.date)).format('YYYY-MM') === date && item.typeId === typeId;
        }
        return moment(Number(item.date)).format('YYYY-MM') === date;
      });

      // 格式化数据，将其变成前端所需要的格式
      const listMap = _list
        .reduce((pre, cur) => {
          const date = moment(Number(cur.date)).format('YYYY-MM-DD');
          const findDate = pre.find(item => item.date === date);
          if (findDate) {
            findDate.bills.push(cur);
          } else {
            pre.push({
              date,
              bills: [cur]
            });
          }
          return pre;
        }, [])
        .sort((a, b) => b.date - a.date); // 时间顺序倒序排列，最新的在前面

      // 分页
      const total = listMap.length;
      const listMapPage = listMap.slice((page - 1) * pageSize, page * pageSize);

      // 计算当月总收入和支出
      // 当月所有账单列表
      const monthList = list.filter(item => moment(Number(item.date)).format('YYYY-MM') === date);
      // 计算收入
      const totalIncome = monthList.reduce((pre, cur) => {
        if (cur.payType === 2) {
          return pre + Number(cur.amount);
        }
        return pre;
      }, 0);
      // 计算支出
      const totalExpense = monthList.reduce((pre, cur) => {
        if (cur.payType === 1) {
          return pre + Number(cur.amount);
        }
        return pre;
      }, 0);

      // 返回数据
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          list: listMapPage || [],
          totalPage: Math.ceil(total / pageSize), // 总页数
          totalExpense, // 总支出
          totalIncome // 总收入
        }
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      };
    }
  }

  // 获取账单详情
  async getBillDetail() {
    const { ctx, app } = this;
    const { id = '' } = ctx.request.body;
    const token = ctx.request.headers.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return; // 验证token失败
    if (!id) {
      ctx.body = {
        code: 500,
        msg: '订单id不能为空',
        data: null
      };
      return;
    }
    try {
      const res = await ctx.service.bill.getBillDetail(id);
      if (res) {
        ctx.body = {
          code: 200,
          msg: '请求成功',
          data: res
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      };
    }
  }
}

module.exports = BillController;
