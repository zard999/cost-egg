/*
 * @Author: zyh
 * @Date: 2022-12-07 15:20:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-12 18:19:33
 * @FilePath: /ChargeAccount/config/config.default.js
 * @Description: config配置文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 添加mysql连接项
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '42.192.151.130',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码[]
      password: 'xue19991202',
      // 数据库名
      database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1670397601241_4494';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 配置白名单：解决安全威胁csrf的防范
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };

  // 模版(将view文件夹下的.html后缀的文件识别为.ejs)
  config.view = {
    mapping: {
      '.html': 'ejs', // 左边写成.html后缀，会自动渲染.html文件
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
