/*
 * @Author: zyh
 * @Date: 2023-02-19 22:42:37
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-19 22:48:53
 * @FilePath: /ChargeAccountEggNode/app/extend/helper.js
 * @Description: 封装方法
 *
 * Copyright (c) 2023 by 穿越, All Rights Reserved.
 */
exports.objArrChangeString = (arr, flag) => {
  return arr.reduce((pre, cur, index) => {
    if (index === arr.length - 1) {
      if (flag) {
        return pre + cur[flag];
      }
      return pre + cur;
    }
    if (flag) {
      return pre + cur[flag] + ',';
    }
    return pre + cur + ',';
  }, '');
};
