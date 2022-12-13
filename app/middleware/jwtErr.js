/*
 * @Author: zyh
 * @Date: 2022-12-13 15:28:12
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-13 15:44:26
 * @FilePath: /ChargeAccount/app/middleware/jwtErr.js
 * @Description: token验证中间件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';
/**
 *
 * @param {*} secret 密钥
 * @des 中间件默认抛出一个函数，这个函数接受两个参数，第一个是 Context 对象，第二个 next 是继续执行后续的接口逻辑
 * @return
 */
module.exports = secret => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization; // 若是没有token，返回的是null
    if (token) {
      try {
        ctx.app.jwt.verify(token, secret); // 解密
        await next();
      } catch (error) {
        console.log('error', error);
        ctx.status = 200;
        ctx.body = {
          code: 401,
          msg: '登录已过期，请重新登录',
          data: null,
        };
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
        data: null,
      };
    }
  };
};
