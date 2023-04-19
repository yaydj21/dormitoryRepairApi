/*
 Navicat Premium Data Transfer

 Source Server         : paohui-mysql
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : 123.56.154.63:3306
 Source Schema         : dormitory_repair_db

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 03/04/2023 19:33:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `role` int NULL DEFAULT 0 COMMENT '管理员角色默认为0'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('admin', 'admin', 0);

-- ----------------------------
-- Table structure for maintainer
-- ----------------------------
DROP TABLE IF EXISTS `maintainer`;
CREATE TABLE `maintainer`  (
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '登录账号，即工号 22年份加编号001 ',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '维修员姓名',
  `telNum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话号码',
  `department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '部门',
  `sex` int NULL DEFAULT NULL COMMENT '性别 0为女 1为男',
  `enable` int NULL DEFAULT NULL COMMENT '是否启用 0为未启用 1为启用',
  `role` int NULL DEFAULT 1 COMMENT '维修员角色默认为1',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '是否删除 0未删除 1已删除'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of maintainer
-- ----------------------------
INSERT INTO `maintainer` VALUES ('2022001', '123456', '老王', '13453445671', '水电部', 0, 1, 1, '0');
INSERT INTO `maintainer` VALUES ('2023001', '123456', '老梁', '13234623456', '信息部', 1, 0, 1, '0');
INSERT INTO `maintainer` VALUES ('211', '2111', '小帅', '123123455222', '网络部', 1, 0, 1, '0');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标题',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '内容',
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '时间',
  `status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '0未删除 1已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, '2022年2月宿舍检查通知', 'If your Internet Service Provider (ISP) does not provide direct access to its server, Secure Tunneling Protocol (SSH) / HTTP is another solution.', '2022-02-25 22:26:31', '0');
INSERT INTO `notice` VALUES (2, '“节约用水、保护水资源”', 'To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window. All the Navicat Cloud objects are located under               ', '2022-02-19 08:16:08', '0');
INSERT INTO `notice` VALUES (3, '保护宿舍干净整洁的倡议书', 'Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find Builder or Aggregate Builder for building queries visually.', '2022-01-29 18:37:32', '0');
INSERT INTO `notice` VALUES (4, '系统维护公告', 'The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. Sometimes you win, sometimes you learn.', '2022-03-23 07:19:49', '0');
INSERT INTO `notice` VALUES (5, '系统正式上线公告', 'Navicat Cloud could not connect and access your databases. By which it means, it could only store your connection settings, queries, model files, and virtual group; your database passwords            ', '2022-03-21 20:48:33', '0');
INSERT INTO `notice` VALUES (6, '提高卫生意识,建立文明健康生活方式', 'In the Objects tab, you can use the List List, Detail Detail and ER Diagram ER Diagram buttons to change the object view.', '2022-06-18 15:07:56', '0');
INSERT INTO `notice` VALUES (7, '寝室整洁靠大家,快乐才有你我他', 'Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database                 ', '2022-03-29 18:14:50', '0');
INSERT INTO `notice` VALUES (8, '2022年1月宿舍环境卫生', 'Navicat 15 has added support for the system-wide dark mode. There is no way to happiness. Happiness is the way. You must be the change you wish to see in the world.', '2022-08-12 18:17:01', '0');
INSERT INTO `notice` VALUES (9, 'test1', 'To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must                 ', '2022-05-18 08:51:09', '0');
INSERT INTO `notice` VALUES (10, 'test2', 'It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. To start working with your server in Navicat, you should first establish a connection          ', '2022-01-11 04:57:46', '0');

-- ----------------------------
-- Table structure for repairOrder
-- ----------------------------
DROP TABLE IF EXISTS `repairOrder`;
CREATE TABLE `repairOrder`  (
  `orderId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '工单号(时间年月日时分秒）',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '报修内容',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '报修地址',
  `applicant` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '申请人',
  `telNum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '联系电话',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `faultPicture` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '故障图片地址',
  `faultType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '故障类型',
  `status` int NULL DEFAULT NULL COMMENT '处理状态 0为未审核 1为已审核 2已完成 3为已失败',
  `deleteStatus` int NULL DEFAULT 0 COMMENT '是否删除 0为未删除 1为已删除'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of repairOrder
-- ----------------------------
INSERT INTO `repairOrder` VALUES ('20221226223535', '跳闸', '47栋', '2013202040101', '13256782978', 'starbug@qq.com', 'https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg', '水电故障', 1, 0);
INSERT INTO `repairOrder` VALUES ('20230216101023', '水管爆了', '47栋', '2013202040101', '13256782978', 'starbug@qq.com', 'https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg', '水电故障', 1, 0);
INSERT INTO `repairOrder` VALUES ('20230216121023', '上不了网', '47栋', '2013202040101', '13256782978', 'starbug@qq.com', 'https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg', '网络故障', 2, 0);
INSERT INTO `repairOrder` VALUES ('20230216141023', '门坏了', '47栋', '2013202040101', '13256782978', 'starbug@qq.com', 'https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg', '门锁故障', 3, 0);
INSERT INTO `repairOrder` VALUES ('20230216161023', '天花板漏水', '47栋', '2013202040101', '13256782978', 'starbug@qq.com', 'https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg', '其它', 2, 0);
INSERT INTO `repairOrder` VALUES ('20230327165302', '没网络', '47栋', '2013202040101', '13256782978', 'starbug@qq.com', 'https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg', '网络故障', 0, 0);
INSERT INTO `repairOrder` VALUES ('20230328165302', '没网络', '47栋', '2013202040101', '13256782978', 'starbug@qq.com', 'https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg', '网络故障', 0, 0);
INSERT INTO `repairOrder` VALUES ('20230401190430', '123', '123', '211', '123', '123', 'https://www.starbug.vip/oss/dormitory-bucket/20230401190430.jpg', '其它', 0, 0);
INSERT INTO `repairOrder` VALUES ('20230401190533', '123', '123', '211', '123', '123', 'https://www.starbug.vip/oss/dormitory-bucket/20230401190533.jpg', '其它', 0, 0);
INSERT INTO `repairOrder` VALUES ('20230401234937', '网络不行', '47栋', '2113202040112', '13728557491', '1234567@qq.com', 'https://www.starbug.vip/oss/dormitory-bucket/20230401234937.jpg', '网络故障', 0, 0);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '登录账号 即学号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '姓名',
  `college` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '学院',
  `class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '班级',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `telNum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话号码',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '地址',
  `role` int NULL DEFAULT 2 COMMENT '学生角色默认为2',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '删除状态 0为未删除 1为删除'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('2013202040101', '1234567', '梁浩辉', '信息技术学院', '软件工程', 'starbug@qq.com', '13256782978', '4栋', 2, '0');
INSERT INTO `student` VALUES ('2113202040112', '123456', '杨德俊', '信息技术学院', '软件工程', '1234567@qq.com', '13728557491', '47栋', 2, '0');
INSERT INTO `student` VALUES ('211', '2111', 'test名字', 'test学院', 'test班级', 'test邮箱', 'test号码', '西区11栋', 2, '0');

SET FOREIGN_KEY_CHECKS = 1;
