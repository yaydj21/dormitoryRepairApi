const express = require('express');

// 创建路由对象
const router = express.Router();

// 导入维修员路由处理函数
const maintainerHandler = require('../router_handler/maintainer_handler');

// 获取维修员信息
router.get('/maintainerInfo',maintainerHandler.getmaintainers);

// 删除某个维修员信息
router.put('/maintainerInfoDelete',maintainerHandler.maintainerInfoDelete);


module.exports = router;

