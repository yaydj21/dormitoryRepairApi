const express = require('express');

// 创建路由对象
const router = express.Router();

// 导入订单路由处理函数
const repairOrderHandler = require('../router_handler/repairOrder_handler');

// 获取订单信息
router.get('/repairOrderInfo',repairOrderHandler.getRepairOrders);


module.exports = router;

