/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 5.5.54 : Database - ext-shiro-admin
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `sys_log` */

DROP TABLE IF EXISTS `sys_log`;

CREATE TABLE `sys_log` (
  `id` varchar(50) NOT NULL COMMENT '主键',
  `userName` varchar(50) NOT NULL COMMENT '用户',
  `logTitle` varchar(300) DEFAULT NULL COMMENT '日志标题',
  `logContent` text COMMENT '日志内容',
  `clientIp` varchar(50) DEFAULT NULL COMMENT '客户端IP',
  `requestUrl` varchar(300) DEFAULT NULL COMMENT '请求URL',
  `requestMethod` varchar(20) DEFAULT NULL COMMENT '请求方式',
  `requestParams` text COMMENT '参数',
  `logTime` datetime DEFAULT NULL COMMENT '日志时间',
  `other` varchar(300) DEFAULT NULL COMMENT '备用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='日志表';

/*Data for the table `sys_log` */

insert  into `sys_log`(`id`,`userName`,`logTitle`,`logContent`,`clientIp`,`requestUrl`,`requestMethod`,`requestParams`,`logTime`,`other`) values ('1941e32d49f3442bb30d88dbac01705d','admin','','编辑用户','0:0:0:0:0:0:0:1','/user/doEdit','POST','{\"password\":[\"\"],\"userImg\":[\"/upload/2017-07-06/bw98sjevkkgi3cvzls5hqpc2dxhzo7qv.jpg\"],\"file\":[\"\"],\"userState\":[\"1\"],\"password2\":[\"\"],\"userDesc\":[\"超级管理员\"],\"id\":[\"8ec475bfc69041a4a3984c5510f7982b\"],\"userName\":[\"admin\"],\"roleIds[]\":[\"737933bffef640329a4f864c4e2746ba\"]}','2017-07-06 15:39:36',NULL),('3ccae7cd77544b929d379d238364a78b','admin','','编辑用户','0:0:0:0:0:0:0:1',NULL,'POST','{\"password\":[\"\"],\"userImg\":[\"/upload/2017-07-06/bw98sjevkkgi3cvzls5hqpc2dxhzo7qv.jpg\"],\"file\":[\"\"],\"userState\":[\"1\"],\"password2\":[\"\"],\"userDesc\":[\"超级管理员\"],\"id\":[\"8ec475bfc69041a4a3984c5510f7982b\"],\"userName\":[\"admin\"],\"roleIds[]\":[\"737933bffef640329a4f864c4e2746ba\"]}','2017-07-06 15:38:10',NULL),('5d6dd88bed3045e385870ad5db52b3a2','admin','','更新角色状态','0:0:0:0:0:0:0:1','/role/roleState','GET','{\"roleState\":[\"true\"],\"id\":[\"737933bffef640329a4f864c4e2746ba\"],\"_\":[\"1499327175984\"]}','2017-07-06 15:46:20',NULL),('8e97fe59385d430d862f73e09087934b','admin','','更新角色状态','0:0:0:0:0:0:0:1','/role/roleState','GET','{\"roleState\":[\"true\"],\"id\":[\"737933bffef640329a4f864c4e2746ba\"],\"_\":[\"1499327175982\"]}','2017-07-06 15:46:19',NULL),('be6e9a25b12c47fe92de521003f50382','admin','','编辑角色','0:0:0:0:0:0:0:1','/role/doEdit','POST','{\"roleName\":[\"超级管理员\"],\"roleDesc\":[\"超级管理员\"],\"id\":[\"737933bffef640329a4f864c4e2746ba\"]}','2017-07-06 15:46:18',NULL),('c0f7a4af5dc240a38ed73c702e129baa','admin','','更新角色状态','0:0:0:0:0:0:0:1','/role/roleState','GET','{\"roleState\":[\"false\"],\"id\":[\"737933bffef640329a4f864c4e2746ba\"],\"_\":[\"1499327175981\"]}','2017-07-06 15:46:19',NULL),('e28ca7d678fa41eb8bc712c6ad59f1af','admin','','更新角色状态','0:0:0:0:0:0:0:1','/role/roleState','GET','{\"roleState\":[\"false\"],\"id\":[\"737933bffef640329a4f864c4e2746ba\"],\"_\":[\"1499327175983\"]}','2017-07-06 15:46:19',NULL);

/*Table structure for table `sys_menu` */

DROP TABLE IF EXISTS `sys_menu`;

CREATE TABLE `sys_menu` (
  `id` varchar(50) NOT NULL COMMENT '主键',
  `text` varchar(50) NOT NULL COMMENT '菜单名称',
  `pid` varchar(50) NOT NULL COMMENT '父级菜单ID',
  `url` varchar(255) DEFAULT NULL COMMENT '连接地址',
  `iconCls` varchar(50) DEFAULT NULL COMMENT '图标',
  `sort` int(11) DEFAULT '0' COMMENT '排序',
  `deep` int(11) DEFAULT NULL COMMENT '深度',
  `code` varchar(50) DEFAULT NULL COMMENT '编码',
  `resource` varchar(50) DEFAULT NULL COMMENT '资源名称',
  `xtype` varchar(50) DEFAULT NULL COMMENT '试图别名',
  `glyph` varchar(50) DEFAULT NULL COMMENT '字体图标',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';

/*Data for the table `sys_menu` */

insert  into `sys_menu`(`id`,`text`,`pid`,`url`,`iconCls`,`sort`,`deep`,`code`,`resource`,`xtype`,`glyph`) values ('0c9b5fc8b44b41d1871a8fc8300247ec','删除菜单','4','','',4,3,'010303','menu:delete',NULL,NULL),('1','系统管理','0','#','',0,1,'01','','','0xf007'),('1db9105008404a3485b6fac30dba3c0e','查看角色列表','3','','',0,3,'010200','role:list','',''),('2','用户管理','1','/user/list','user',1,2,'0101','user','userlist','0xf007'),('3','角色管理','1','/role/list','',2,2,'0102','role','rolelist','0xf0c0'),('3b18f3d776c74266b63c2542825aa3c3','SPU管理','be659f4c66fb4db989f654eb408d86e1','','',0,2,'0201','','',''),('3f26102ef0e04c3c9328cb97067cc5fa','创建菜单','4','','',1,3,'010301','menu:add',NULL,NULL),('4','菜单管理','1','/menu/list','icon-menu',3,2,'0103','menu','treemenu','0xf03a'),('4253190001c1480fb0d631d64d150535','编辑用户','2','','',2,3,'010102','user:edit',NULL,NULL),('42dd5ae31e3a43b3a197440e8ec19a94','监控列表','f5a20c82110b4a3ea9e30ca01a038680','','',1,3,'010701','monitor:lost',NULL,NULL),('45104a1560e34dcebb88cb8ae4bfdb1c','财务管理','0','#','',0,1,'05','','','0xf157'),('488ef1eff57b4827acade7c0744278ce','查看菜单列表','4','','',0,3,'010300','menu:list',NULL,NULL),('60dda993d87647f5989c15f14f866df9','新增角色','3','','',1,3,'010201','role:add','',''),('649b484b58414d91aefa5a26143e6557','删除用户','2','','',3,3,'010103','user:delete','',''),('686630c7cb624cc786dcdc9958971a6b','编辑角色','3','','',2,3,'010202','role:edit','',''),('71a3a39a92b64aada22b57b36587b866','仓库管理','0','#','',0,1,'04','','','0xf0b1'),('809db56d93e848e8b43396e125803884','日志管理','1','/log/list','icon-rizhi',4,2,'0104','','loglist','0xf129'),('9c51e94cef99435780fb72bdb923a2ab','重置密码','2','','',4,3,'010104','user:restpwd','',''),('a5ebf29168234406939856bc6890c86b','角色授权','3','','',4,3,'010204','role:auth','',''),('a73802e513cc4465883530ec8074abbb','新增用户','2','','',1,3,'010101','user:add','',''),('b4e7232189b14cf3ba160cf7b0d3bf37','删除角色','3','','',3,3,'010203','role:delete','',''),('b9731c79358a4abc951900203e030ed3','采购管理','0','#','',0,1,'03','','','0xf0f3'),('be659f4c66fb4db989f654eb408d86e1','商品管理','0','#','',0,1,'02','','','0xf217'),('c0c304be5c294114b5bc0d0c3acef992','日志列表','809db56d93e848e8b43396e125803884','','',1,3,'010401','log:list',NULL,NULL),('c7a50ded6fe14609a9da785e273b5af1','报表管理','0','#','',0,1,'06','','','0xf1c3'),('d2bc30feb5474a1bb7e02d48d39a3f8a','查看用户列表','2','','',0,3,'010100','user:list',NULL,NULL),('dc5f478d98ed4297a8ae638fe90df050','编辑菜单','4','','',3,3,'010302','menu:edit',NULL,NULL),('e243bf5858d74e089650816cd6671c99','111111','b9731c79358a4abc951900203e030ed3','#xxx','',1,2,'0301','','',''),('f5a20c82110b4a3ea9e30ca01a038680','系统监控','1','/druid/wall.html','icon-jiankong',7,2,'0107','',NULL,'0xf06e');

/*Table structure for table `sys_role` */

DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `id` varchar(50) NOT NULL COMMENT '主键',
  `roleName` varchar(50) NOT NULL COMMENT '角色名称',
  `roleDesc` varchar(300) DEFAULT NULL COMMENT '角色描述',
  `roleState` int(2) DEFAULT '1' COMMENT '状态,1-启用,-1禁用',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

/*Data for the table `sys_role` */

insert  into `sys_role`(`id`,`roleName`,`roleDesc`,`roleState`,`createTime`) values ('2a9b728a431246b08f853c2529e6ba84','测试角色','测试',1,'2017-02-28 15:15:41'),('ADMIN','超级管理员','超级管理员',1,'2016-12-14 10:22:34');

/*Table structure for table `sys_role_menu` */

DROP TABLE IF EXISTS `sys_role_menu`;

CREATE TABLE `sys_role_menu` (
  `id` varchar(50) NOT NULL COMMENT '主键',
  `roleId` varchar(50) NOT NULL COMMENT '角色主键',
  `menuId` varchar(50) NOT NULL COMMENT '菜单主键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色菜单关联表';

/*Data for the table `sys_role_menu` */

insert  into `sys_role_menu`(`id`,`roleId`,`menuId`) values ('08ca2023dbd94456b7300098276f5542','ADMIN','3'),('0b31769a85914f02bf361784f73d57a4','ADMIN','649b484b58414d91aefa5a26143e6557'),('0ee740c221704b7789e80b4586aebdc2','ADMIN','71a3a39a92b64aada22b57b36587b866'),('12d7fb2cd4f94f6e88b287e01aa039b4','ADMIN','b9731c79358a4abc951900203e030ed3'),('13522a67a96f4bc2973dd095c279fd67','ADMIN','45104a1560e34dcebb88cb8ae4bfdb1c'),('1b370b6562364010931820d083e1e661','ADMIN','2'),('24fb2d01d4424946930dca24ff44bec4','ADMIN','42dd5ae31e3a43b3a197440e8ec19a94'),('2c12fe09f52c4925ba9a119bb033cb40','2a9b728a431246b08f853c2529e6ba84','649b484b58414d91aefa5a26143e6557'),('3fc0cb04124b479b909c676c337b4ee4','2a9b728a431246b08f853c2529e6ba84','60dda993d87647f5989c15f14f866df9'),('49265ba174bc4dfc952052ffeeb16acc','2a9b728a431246b08f853c2529e6ba84','1db9105008404a3485b6fac30dba3c0e'),('4fd49dee63444b12ab96872ea3505219','2a9b728a431246b08f853c2529e6ba84','3f26102ef0e04c3c9328cb97067cc5fa'),('50d6821625694635a2248d660bc2ed09','ADMIN','a5ebf29168234406939856bc6890c86b'),('54a170f6a65e4e0fb1aa067939fa7d2e','2a9b728a431246b08f853c2529e6ba84','d2bc30feb5474a1bb7e02d48d39a3f8a'),('5624125403954a60bc217fd01688e325','ADMIN','f5a20c82110b4a3ea9e30ca01a038680'),('58647e17c4894ed480d6d533f544b643','ADMIN','9c51e94cef99435780fb72bdb923a2ab'),('60133ea31f6e4d5aa485b9b0686333f0','ADMIN','c7a50ded6fe14609a9da785e273b5af1'),('638e604af5de48f387fc116d94b6ebaf','ADMIN','686630c7cb624cc786dcdc9958971a6b'),('6bb87373c2db41deb5ebe839286084d1','ADMIN','f899f3d3baec4571b1c786717f9906fd'),('6eb73a029089476397e955f883b335b7','ADMIN','488ef1eff57b4827acade7c0744278ce'),('71c73744ce5d41adbc33433ad600f10b','ADMIN','809db56d93e848e8b43396e125803884'),('74714029ffa34419a91c8330e3014f0a','ADMIN','d2bc30feb5474a1bb7e02d48d39a3f8a'),('74930a61f23f4fb8a31e1f19e78d39fd','ADMIN','4253190001c1480fb0d631d64d150535'),('75056910c3aa4b4583603a1630f7f7cd','ADMIN','1db9105008404a3485b6fac30dba3c0e'),('75fa59ae5c3a448b9e09a2a70b21ff1e','ADMIN','1'),('778dbb388c784cb6bc61f30e805e72de','ADMIN','3f26102ef0e04c3c9328cb97067cc5fa'),('80678bb9c0ba48c18d26666332a6c969','ADMIN','3b18f3d776c74266b63c2542825aa3c3'),('81d804176bd14131a1b5cf10b693e84f','ADMIN','b4e7232189b14cf3ba160cf7b0d3bf37'),('84a69a0d03dc435e93a99fde2f035e15','ADMIN','0c9b5fc8b44b41d1871a8fc8300247ec'),('85198ec3f31d42cca969237e36cd9d27','2a9b728a431246b08f853c2529e6ba84','3'),('93bae193c3ae476dba7bdd9a35c196c5','2a9b728a431246b08f853c2529e6ba84','4'),('9401c66a1c11441c9001df2ca388c758','ADMIN','4'),('9c73e270a69b4d73b4d9d67baa1b4a88','2a9b728a431246b08f853c2529e6ba84','686630c7cb624cc786dcdc9958971a6b'),('9ef3f01c77ff42b3932de26babb14f10','ADMIN','dc5f478d98ed4297a8ae638fe90df050'),('a864f35b1b4143078fb94cd760340b03','ADMIN','be659f4c66fb4db989f654eb408d86e1'),('a9a6fcb3c5b64d6aaece4a121b33a6fb','ADMIN','e243bf5858d74e089650816cd6671c99'),('bbedd09baeef4db09a0b35a547e943a1','ADMIN','a73802e513cc4465883530ec8074abbb'),('bd66f770f2dc4196b8637945d31bd01c','2a9b728a431246b08f853c2529e6ba84','1'),('c887ce221e7149349dfa025f95a50f53','2a9b728a431246b08f853c2529e6ba84','4253190001c1480fb0d631d64d150535'),('cad2628c60a140779d41de742b25db6e','2a9b728a431246b08f853c2529e6ba84','b4e7232189b14cf3ba160cf7b0d3bf37'),('cbafba04e8414c2191945f108b4aa1d7','2a9b728a431246b08f853c2529e6ba84','2'),('cddcf5e82c344b479acade1418f519f8','2a9b728a431246b08f853c2529e6ba84','a73802e513cc4465883530ec8074abbb'),('dd88a4588578486f964fce992f1585f0','ADMIN','c0c304be5c294114b5bc0d0c3acef992'),('e13818b3aa7f4018be4850c2af062cb3','ADMIN','60dda993d87647f5989c15f14f866df9'),('ea1b5ba1aebd4c87a9ceae9dcb99c9b3','2a9b728a431246b08f853c2529e6ba84','9c51e94cef99435780fb72bdb923a2ab'),('f031dbffce314ee9ac2ba27c2730d0cb','2a9b728a431246b08f853c2529e6ba84','a5ebf29168234406939856bc6890c86b');

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `id` varchar(50) NOT NULL COMMENT '主键',
  `userName` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '密码',
  `userState` int(2) NOT NULL DEFAULT '1' COMMENT '用户状态,1-启用,0禁用',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `userDesc` varchar(300) DEFAULT NULL COMMENT '描述',
  `userImg` varchar(300) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

/*Data for the table `sys_user` */

insert  into `sys_user`(`id`,`userName`,`password`,`userState`,`createTime`,`userDesc`,`userImg`) values ('205204b075154118ba277f985aa08fb0','admin','038bdaf98f2037b31f1e75b5b4c9b26e',1,'2017-08-14 17:38:23','我是超级管理员',NULL),('e59de2b1a85d4da49bbbd279e0fdd0d9','test','4292bb58be34c59d28a0dcbd11932d49',1,'2017-08-18 15:20:31','测试',NULL);

/*Table structure for table `sys_user_role` */

DROP TABLE IF EXISTS `sys_user_role`;

CREATE TABLE `sys_user_role` (
  `Id` varchar(50) NOT NULL COMMENT '主键',
  `userId` varchar(50) NOT NULL COMMENT '用户主键',
  `roleId` varchar(50) NOT NULL COMMENT '角色主键',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色关联表';

/*Data for the table `sys_user_role` */

insert  into `sys_user_role`(`Id`,`userId`,`roleId`) values ('2f7bce66d5d54880859f5623fcf5fade','205204b075154118ba277f985aa08fb0','ADMIN'),('427c34ae12ab4e13a915a030e7b0cf59','e59de2b1a85d4da49bbbd279e0fdd0d9','2a9b728a431246b08f853c2529e6ba84');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
