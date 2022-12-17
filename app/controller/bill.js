/*
 * @Author: zyh
 * @Date: 2022-12-14 11:06:18
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-17 14:24:05
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

  // 编辑账单
  async editBill() {
    const { ctx, app } = this;
    const { id, amount, typeId, typeName, payType, remark = '' } = ctx.request.body;
    const token = ctx.request.headers.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return; // 验证token失败
    if (!id || !amount || !typeId || !typeName || !payType) {
      ctx.body = {
        code: 500,
        msg: '参数错误',
        data: null
      };
      return;
    }
    try {
      const res = await ctx.service.bill.editBill({
        id,
        amount,
        date: +new Date(),
        typeId,
        typeName,
        payType,
        remark
      });
      if (res) {
        ctx.body = {
          code: 200,
          msg: '请求成功',
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

  // 删除账单
  async deleteBill() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
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
      const res = await ctx.service.bill.deleteBill(id);
      if (res) {
        ctx.body = {
          code: 200,
          msg: '请求成功',
          data: null
        };
      }
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  // {
  //   totalData: [
  //     {
  //       number: 137.84, // 支出或收入数量
  //       payType: 1, // 支出或消费类型值
  //       typeId: 1, // 消费类型id
  //       typeName: "餐饮" // 消费类型名称
  //     }
  //   ],
  //   total_expense: 3123.54, // 总消费
  //   total_income: 6555.80 // 总收入
  // }
  // 月账单统计（图表）
  async getBillChart() {
    const { ctx, app } = this;
    const { date = moment().format('YYYY-MM') } = ctx.request.body;
    const token = ctx.request.headers.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return; // 验证token失败
    try {
      // 查询该用户所有账单数据
      const res = await ctx.service.bill.getBillList(decode.id);
      if (!res || !res.length) {
        ctx.body = {
          code: 200,
          msg: '请求成功',
          data: {
            totalData: [], // 总数据
            totalExpense: 0, // 总支出
            totalIncome: 0 // 总收入
          }
        };
        return;
      }

      // 获取该月份的账单数据
      const monthBillList = res.filter(item => {
        return moment(Number(item.date)).format('YYYY-MM') === date;
      });

      // 总支出
      const totalExpense = monthBillList.reduce((prev, cur) => {
        if (cur.payType === 1) {
          prev += Number(cur.amount);
        }
        return prev;
      }, 0);

      // 总收入
      const totalIncome = monthBillList.reduce((prev, cur) => {
        if (cur.payType === 2) {
          prev += Number(cur.amount);
        }
        return prev;
      }, 0);

      // 总的收支构成
      const totalData = monthBillList.reduce((prev, cur) => {
        const index = prev.findIndex(item => item.typeId === cur.typeId);
        if (index > -1) {
          prev[index].number += Number(cur.amount);
        } else {
          prev.push({
            number: Number(cur.amount),
            payType: cur.payType,
            typeId: cur.typeId,
            typeName: cur.typeName
          });
        }
        return prev;
      });

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          totalData: totalData || [],
          totalExpense: Number(totalExpense.toFixed(2)),
          totalIncome: Number(totalIncome.toFixed(2))
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
}

module.exports = BillController;
