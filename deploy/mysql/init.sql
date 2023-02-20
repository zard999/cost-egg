/*
 Navicat Premium Data Transfer

 Source Server         : cost
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : 42.192.151.130:33060
 Source Schema         : cost

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 20/02/2023 23:47:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '账单唯一id',
  `payType` int NOT NULL COMMENT '账单类型',
  `amount` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账单价格',
  `date` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账单日期',
  `typeName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账单名称',
  `typeId` int NOT NULL COMMENT '账单标签id',
  `userId` int NOT NULL COMMENT '账单归属的用户id',
  `remark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账单备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of bill
-- ----------------------------
BEGIN;
INSERT INTO `bill` (`id`, `payType`, `amount`, `date`, `typeName`, `typeId`, `userId`, `remark`) VALUES (1, 1, '2000', '1670988511835', '餐饮', 1, 1, '备注信息');
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `roleName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限描述',
  `permissions` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限菜单数组',
  `created_at` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '创建时间',
  `updated_at` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`id`, `roleName`, `description`, `permissions`, `created_at`, `updated_at`) VALUES (1, '超级管理员', '超级管理员', '[\"/home/index\",\"/proTable\",\"/proTable/useHooks1\",\"/proTable/useHooks2\",\"/authorityManagement\",\"/authorityManagement/user\",\"/authorityManagement/position\"]', '1676709098078', '1676709098078');
INSERT INTO `role` (`id`, `roleName`, `description`, `permissions`, `created_at`, `updated_at`) VALUES (5, '测试', '测试', '[\"/home/index\"]', '1676704750019', '1676901288064');
INSERT INTO `role` (`id`, `roleName`, `description`, `permissions`, `created_at`, `updated_at`) VALUES (8, '测试2', '测试2', '[\"/proTable\",\"/proTable/useHooks1\",\"/proTable/useHooks2\"]', '1676818724794', '1676901294015');
COMMIT;

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '标签唯一id',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签名称',
  `type` int NOT NULL COMMENT '标签类型，默认1为收入，2为支出',
  `userId` int NOT NULL COMMENT '保留字段，设置该标签的用户归属，默认0为全部用户可见',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='标签表';

-- ----------------------------
-- Records of type
-- ----------------------------
BEGIN;
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (1, '餐饮', 1, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (2, '服饰', 1, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (3, '交通', 1, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (4, '日用', 1, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (5, '购物', 1, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (6, '学习', 1, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (7, '医疗', 1, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (8, '旅行', 1, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (9, '人情', 1, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (10, '其他', 1, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (11, '工资', 2, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (12, '奖金', 2, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (13, '转账', 2, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (14, '理财', 2, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (15, '退款', 2, 0);
INSERT INTO `type` (`id`, `name`, `type`, `userId`) VALUES (16, '其他', 2, 0);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `signature` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '个性签名',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '头像',
  `ctime` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (1, 'admin', '123456', '我是zyh', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1670901525863');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (2, 'test', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1670910760508');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (42, 'test2', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676709955849');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (43, '', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676719753872');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (44, 'test3', '111111', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676771449813');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (45, 'test4', '111111', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676771727972');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (46, 'test5', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676811377088');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (47, 'test6', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676811482877');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (48, 'test7', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676811673956');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (49, 'test8', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676811782514');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (50, 'test9', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676811865759');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (51, 'test10', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676812167986');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (52, 'test11', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676812199861');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (53, 'test12', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676812230207');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (54, 'test13', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676812281397');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (55, 'test14', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676812578563');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (56, 'test15', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676812737897');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (57, 'test16', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676813236848');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (58, 'test17', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676813399591');
INSERT INTO `user` (`id`, `username`, `password`, `signature`, `avatar`, `ctime`) VALUES (59, 'test18', '123456', '这个人很懒，什么都没有留下', 'http://file.dev.uplasm.com/file/2022/12/13/1bb87d41d15fe27b500a4bfcde01bb0e.png', '1676860010897');
COMMIT;

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户id',
  `role_id` int NOT NULL COMMENT '角色id',
  `created_at` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '创建时间',
  `updated_at` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
BEGIN;
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (1, 1, 1, '1676706837746', '1676706837746');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (2, 42, 5, '1676709956080', '1676709956080');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (3, 44, 1, '1676771450040', '1676771450040');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (4, 45, 1, '1676771728210', '1676771728210');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (5, 46, 1, '1676811377326', '1676811377326');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (16, 59, 8, '1676860011127', '1676860011127');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (22, 48, 1, '1676860438024', '1676860438024');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (23, 48, 1, '1676860442942', '1676860442942');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (25, 48, 1, '1676860446041', '1676860446041');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (26, 48, 8, '1676860525197', '1676860525197');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (27, 48, 1, '1676860525197', '1676860525197');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (28, 49, 1, '1676860537820', '1676860537820');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (32, 49, 1, '1676860545177', '1676860545177');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (59, 55, 1, '1676863322042', '1676863322042');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (60, 55, 1, '1676863333779', '1676863333779');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (61, 55, 5, '1676863333779', '1676863333779');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (78, 59, 5, '1676867671298', '1676867671298');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (79, 56, 5, '1676867687271', '1676867687271');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (80, 56, 1, '1676867691153', '1676867691153');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (84, 57, 8, '1676867723093', '1676867723093');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (85, 57, 5, '1676867723093', '1676867723093');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (86, 58, 1, '1676867730768', '1676867730768');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (87, 2, 5, '1676901300939', '1676901300939');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES (88, 2, 8, '1676901300939', '1676901300939');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
