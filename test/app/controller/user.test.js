/*
 * @Author: zyh
 * @Date: 2022-12-13 11:20:56
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-16 16:48:41
 * @FilePath: /ChargeAccount/test/app/controller/user.test.js
 * @Description: user测试用例
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';
const registerMock = require('../../mockData/register/index.js');

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  it('should assert', async () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });
  // it('should POST /api/user/register 新用户注册', async () => {
  //   const res = await app.httpRequest()
  //     .post('/api/user/register')
  //     .send(registerMock.new)
  //     .expect(200);
  //   console.log('register', res.body);
  //   assert(res.body.code === 200);
  // });
  it('should POST /api/user/register 用户名重复', async () => {
    const res = await app.httpRequest().post('/api/user/register').send(registerMock.userRepeat).expect(200);
    assert(res.body.code === 500);
  });
  it('should POST /api/user/register 用户名为空', async () => {
    const res = await app.httpRequest().post('/api/user/register').send(registerMock.userNull).expect(200);
    assert(res.body.code === 500);
  });
  it('should POST /api/user/register 密码为空', async () => {
    const res = await app.httpRequest().post('/api/user/register').send(registerMock.passNull).expect(200);
    assert(res.body.code === 500);
  });
});
