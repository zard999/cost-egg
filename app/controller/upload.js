/*
 * @Author: zyh
 * @Date: 2022-12-13 16:36:10
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-13 17:36:47
 * @FilePath: /ChargeAccount/app/controller/upload.js
 * @Description: 上传图片
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
'use strict';

const fs = require('fs');
const moment = require('moment'); // 时间戳转换
const mkdirp = require('mkdirp'); // 递归创建目录
const path = require('path');

const { Controller } = require('egg');

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    // 获取前端传入的图片
    const file = ctx.request.files[0];
    // 声明存放资源的路径
    let uploadDir = '';
    try {
      // 通过文件路径file.filepath读取文件内容
      const f = fs.readFileSync(file.filepath);
      // 1. 通过moment获取当前日期
      const day = moment(new Date()).format('YYYYMMDD');
      // 2. 通过mkdirp创建目录
      const dir = path.join(this.config.uploadDir, day);
      mkdirp.sync(dir);
      // 3. 通过fs写入文件
      const filename = `${Date.now()}${path.extname(file.filename)}`;
      uploadDir = path.join(dir, filename);
      fs.writeFileSync(uploadDir, f);
      // 4. 返回文件路径
      console.log('file', uploadDir);
      ctx.body = {
        code: 200,
        msg: '上传成功',
        data: uploadDir.replace(/app/g, ''), // 替换app 前端访问时不需要app
      };
    } catch (error) {
      console.log('readFile error', error);
      ctx.body = {
        code: 500,
        msg: '上传失败',
      };
    } finally {
      // 删除临时文件
      ctx.cleanupRequestFiles();
    }
  }
}

module.exports = UploadController;
