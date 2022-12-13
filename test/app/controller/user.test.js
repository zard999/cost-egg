/*
 * @Author: zyh
 * @Date: 2022-12-13 11:20:56
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-13 11:28:02
 * @FilePath: /ChargeAccount/test/app/controller/user.test.js
 * @Description: user测试用例
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  it('should assert', async () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });
  // 注册
  it('should POST /api/user/register', async () => {
    return app.httpRequest()
      .post('/api/user/register')
      .send({ username: 'test', password: '123456' })
      .expect(200);
  });
});
