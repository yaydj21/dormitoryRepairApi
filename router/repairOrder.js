const express = require('express');

// 创建路由对象
const router = express.Router();

// 导入订单路由处理函数
const repairOrderHandler = require('../router_handler/repairOrder_handler');

// 接口实例地址：http://127.0.0.1:3007/repairOrder/todayFinishedRepairCount

// 获取订单信息接口
router.get('/repairOrderInfo',repairOrderHandler.getRepairOrders);

//获取我的维修订单信息
router.post('/myRepairOrders',repairOrderHandler.getMyRepairOrders);

// 获取某个维修订单信息
router.post('/repairIdOrderInfo',repairOrderHandler.getRepairIdOrderInfo);

// 修改某个维修订单信息
router.post('/updateRepairIdOrderInfo',repairOrderHandler.updateRepairIdOrderInfo);

// 删除某个订单信息
router.put('/orderDataDelete',repairOrderHandler.orderDataDelete);

// 增加某个订单信息
router.post('/addOrder',repairOrderHandler.addOrder);

// 获取首页展示标签的数据接口
router.get('/homeRepairTag',repairOrderHandler.getHomeRepairTag);

// 获取近7日报修的类型
router.get('/repairOrders7Days',repairOrderHandler.getRepairOrders7Days);

// 获取本月和上个月报修的类型接口 
router.get('/monthRepairTypesRepairCount',repairOrderHandler.getMonthRepairTypesRepairCount);

// 获取系统全部报修的类型接口getAllRepairTypesRepairCount
router.get('/allRepairTypesRepairCount',repairOrderHandler.getAllRepairTypesRepairCount);


module.exports = router;

