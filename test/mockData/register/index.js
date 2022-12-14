/*
 * @Author: zyh
 * @Date: 2022-12-13 19:05:22
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-13 19:08:46
 * @FilePath: /ChargeAccount/test/mockData/register/index.js
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
module.exports = {
  new: {
    username: 'test',
    password: '123456',
  },
  userRepeat: {
    username: 'test',
    password: '123456',
  },
  userNull: {
    username: '',
    password: '123456',
  },
  passNull: {
    username: 'test',
    password: '',
  },
};
