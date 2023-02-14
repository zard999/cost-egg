/*
 * @Author: zyh
 * @Date: 2022-12-07 15:20:23
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-14 11:16:15
 * @FilePath: /ChargeAccountEggNode/config/config.default.js
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
  const config = (exports = {});

  // 添加mysql连接项
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: process.env.MYSQL_HOST,
      // 端口号
      port: process.env.MYSQL_PORT,
      // 用户名
      user: process.env.MYSQL_USER,
      // 密码[]
      password: process.env.MYSQL_PASSWORD,
      // 数据库名
      database: process.env.MYSQL_DATABASE
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };

  config.jwf = {
    secret: 'Zyh'
  };

  config.cors = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许跨域携带cookie
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  // 设置文件模式 file 和 strem
  config.multipart = {
    mode: 'file'
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1670397601241_4494';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload'
  };

  // 配置白名单：解决安全威胁csrf的防范
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*'] // 配置白名单
  };

  // 模版(将view文件夹下的.html后缀的文件识别为.ejs)
  config.view = {
    mapping: {
      '.html': 'ejs' // 左边写成.html后缀，会自动渲染.html文件
    }
  };

  return {
    ...config,
    ...userConfig
  };
};
