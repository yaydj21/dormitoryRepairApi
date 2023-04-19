const express = require('express');

// 创建路由对象
const router = express.Router();

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user_handler');

// 注册新用户
router.post('/register',userHandler.register);

// 登录
router.post('/login',userHandler.login);

// 修改用户基本信息的路由
router.post('/updateUserInfo',userHandler.updateUserInfo);


module.exports = router;