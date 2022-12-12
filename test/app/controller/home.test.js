/*
 * @Author: zyh
 * @Date: 2022-12-07 15:20:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-12 16:37:37
 * @FilePath: /ChargeAccount/test/app/controller/home.test.js
 * @Description: home测试用例
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  it('should assert', async () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });
  // 查询用户信息
  it('should GET /user', async () => {
    return app.httpRequest()
      .get('/user')
      .expect(200);
  });
  // 添加用户信息
  it('should POST /addUser', async () => {
    return app.httpRequest()
      .post('/addUser')
      .send({ name: 'zyh' })
      .expect(200);
  });
  // 编辑用户信息
  it('should POST /editUser', async () => {
    return app.httpRequest()
      .post('/editUser')
      .send({ id: 4, name: 'xqh' })
      .expect(200);
  });
  // 删除用户信息
  it('shourld POST /deleteUser', async () => {
    return app.httpRequest()
      .post('/deleteUser')
      .send({ id: 5 })
      .expect(200);
  });

});
