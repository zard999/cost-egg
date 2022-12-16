/*
 * @Author: zyh
 * @Date: 2022-12-16 15:47:07
 * @LastEditors: zyh
 * @LastEditTime: 2022-12-16 16:11:33
 * @FilePath: /ChargeAccount/.prettierrc.js
 * @Description: prettier配置
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
 */
module.exports = {
  "printWidth": 120,
  "tabWidth": 2, // 缩进字节数
  "useTabs": false, // 缩进使用tab
  "semi": true, // 句尾添加分号
  "singleQuote": true, // 使用单引号代替双引号
  "proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  "arrowParens": "avoid", // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  "bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  "endOfLine": "auto", // 结尾是 \n \r \n\r auto
  "htmlWhitespaceSensitivity": "ignore",
  "ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  "requireConfig": false, // Require a "prettierconfig" to format prettier
  "trailingComma": "none", // 在对象或数组最后一个元素后面是否加逗号
}
