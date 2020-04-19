/*
 Navicat Premium Data Transfer

 Source Server         : chess
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : mysql

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 19/04/2020 11:31:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chess
-- ----------------------------
DROP TABLE IF EXISTS `chess`;
CREATE TABLE `chess`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '颜色(BLACK，RED)',
  `x` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'x轴(1,2,3,4,5,6,7,8)',
  `y` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'y轴(1,2,34)',
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'display,none',
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chess
-- ----------------------------
INSERT INTO `chess` VALUES (1, '帅', 'RED', '1', '1', 'NONE', '11');
INSERT INTO `chess` VALUES (2, '士', 'RED', '1', '2', 'NONE', '12');
INSERT INTO `chess` VALUES (3, '相', 'RED', '1', '3', 'NONE', '13');
INSERT INTO `chess` VALUES (4, '士', 'RED', '1', '4', 'NONE', '14');
INSERT INTO `chess` VALUES (5, '相', 'RED', '1', '5', 'NONE', '15');
INSERT INTO `chess` VALUES (6, '马', 'RED', '1', '6', 'NONE', '16');
INSERT INTO `chess` VALUES (7, '马', 'RED', '1', '7', 'NONE', '17');
INSERT INTO `chess` VALUES (8, '车', 'RED', '1', '8', 'NONE', '18');
INSERT INTO `chess` VALUES (9, '车', 'RED', '2', '1', 'NONE', '21');
INSERT INTO `chess` VALUES (10, '炮', 'RED', '2', '2', 'NONE', '22');
INSERT INTO `chess` VALUES (11, '炮', 'RED', '2', '3', 'NONE', '23');
INSERT INTO `chess` VALUES (12, '兵', 'RED', '2', '4', 'NONE', '24');
INSERT INTO `chess` VALUES (13, '兵', 'RED', '2', '5', 'NONE', '25');
INSERT INTO `chess` VALUES (14, '兵', 'RED', '2', '6', 'NONE', '26');
INSERT INTO `chess` VALUES (15, '兵', 'RED', '2', '7', 'NONE', '27');
INSERT INTO `chess` VALUES (16, '兵', 'RED', '2', '8', 'NONE', '28');
INSERT INTO `chess` VALUES (17, '将', 'BLACK', '3', '1', 'NONE', '31');
INSERT INTO `chess` VALUES (18, '士', 'BLACK', '3', '2', 'NONE', '32');
INSERT INTO `chess` VALUES (19, '象', 'BLACK', '3', '3', 'NONE', '33');
INSERT INTO `chess` VALUES (20, '士', 'BLACK', '3', '4', 'NONE', '34');
INSERT INTO `chess` VALUES (21, '象', 'BLACK', '3', '5', 'NONE', '35');
INSERT INTO `chess` VALUES (22, '马', 'BLACK', '3', '6', 'NONE', '36');
INSERT INTO `chess` VALUES (23, '马', 'BLACK', '3', '7', 'NONE', '37');
INSERT INTO `chess` VALUES (24, '车', 'BLACK', '3', '8', 'NONE', '38');
INSERT INTO `chess` VALUES (25, '车', 'BLACK', '4', '1', 'NONE', '41');
INSERT INTO `chess` VALUES (26, '炮', 'BLACK', '4', '2', 'NONE', '42');
INSERT INTO `chess` VALUES (27, '炮', 'BLACK', '4', '3', 'NONE', '43');
INSERT INTO `chess` VALUES (28, '卒', 'BLACK', '4', '4', 'NONE', '44');
INSERT INTO `chess` VALUES (29, '卒', 'BLACK', '4', '5', 'NONE', '45');
INSERT INTO `chess` VALUES (30, '卒', 'BLACK', '4', '6', 'NONE', '46');
INSERT INTO `chess` VALUES (31, '卒', 'BLACK', '4', '7', 'NONE', '47');
INSERT INTO `chess` VALUES (32, '卒', 'BLACK', '4', '8', 'NONE', '48');

SET FOREIGN_KEY_CHECKS = 1;
