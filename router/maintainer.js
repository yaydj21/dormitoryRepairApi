const express = require('express');

// 创建路由对象
const router = express.Router();

// 导入通知路由处理函数
const maintainerHandler = require('../router_handler/maintainer_handler');

// 获取通知信息
router.get('/maintainerInfo',maintainerHandler.getmaintainers);


module.exports = router;

