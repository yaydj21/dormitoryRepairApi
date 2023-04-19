const express = require('express');


// 创建路由对象
const router = express.Router();

// 导入学生路由处理函数
const studentHandler = require('../router_handler/student_handler');

// 获取所有学生信息
router.get('/studentInfo',studentHandler.getStudents);

// 获取当前id学生信息
router.post('/idStudentInfo',studentHandler.getIdStudents);

// 上传学生头像到minio
router.post('/uploadAvatar',studentHandler.uploadAvatar);

// 删除某个用户信息
router.put('/studentInfoDelete',studentHandler.studentInfoDelete);


module.exports = router;

