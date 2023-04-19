// 导入 express模块
const express = require('express');

// 导入express-formidable模块 用于读取前端提交的文件
const formidableMiddleware = require('express-formidable');

// 创建express服务器实例
const app = express();



// 导入跨域中间件cors
const cors = require('cors');
app.use(cors());

// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json())

// 配置解析表单数据的中间件 只能解析application/x-www-form-urlencoded格式的表单数据
// app.use(express.urlencoded({extended:true}));


// req.fields; // 非文件项和req.files; // 文件
app.use(formidableMiddleware());


// 一定要在路由之前配置解析Token的中间件
const expressJWT = require('express-jwt');
const config =require('./config');

// unless 除了/api的路由接口都要身份验证
// app.use(expressJWT({secret:config.jwtSecretKey,algorithms: ['HS256']}));


// 下面是路由模块

// 导入通知模块
const noticeRouter = require('./router/notice');
app.use('/notice',noticeRouter)

// 导入维修人员模块
const maintainerRouter = require('./router/maintainer');
app.use('/maintainer',maintainerRouter)

// 导入学生用户模块
const studentRouter = require('./router/student');
app.use('/student',studentRouter)

// 导入订单模块
const repairOrderRouter = require('./router/repairOrder');
app.use('/repairOrder',repairOrderRouter);

// 导入用户路由模块
const userRouter = require('./router/user');
app.use('/api',userRouter);

// // 导入新闻数据路由模块
// const newsRouter = require('./router/news');
// app.use('/api',newsRouter);

// 导入用户信息路由模块
// const userinfoRouter = require('./router/userinfo');
// app.use('/my',userinfoRouter);

// 调用app.listen方法，指定端口号并启动web服务器
app.listen(3007,() =>{
    console.log('api server run at http://127.0.0.1:3007');
});