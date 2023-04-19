const express = require('express');

// 创建路由对象
const router = express.Router();

// 导入通知路由处理函数
const noticeHandler = require('../router_handler/notice_handler');

// 获取通知信息
router.get('/noticeInfo',noticeHandler.getNotices);

// 删除通知信息
router.put('/noticeDataDelete',noticeHandler.deleteNotices);

// 修改通知信息
router.post('/updateNotices',noticeHandler.updateNotices);

// 增加通知信息
router.post('/addNotice',noticeHandler.addNotice);


module.exports = router;

