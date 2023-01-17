const db = require('../db/index');

// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken');

// 导入全局的配置文件
const config = require('../config');

// 注册
exports.regUser = (req,res) =>{
    const userinfo = req.body;
    // 对表单的数据,进行合法性校验
    if (!userinfo.username || !userinfo.password) {
        console.log(userinfo);
        return res.send({ status: 1, message: '用户名或密码不合法' });
    }
    const sql = 'select * from users where username =?';
    db.query(sql,[userinfo.username],(err,results) =>{
        // 执行sql语句失败
        if(err){
            return res.send({status:1,message:err.message});
        }
        // 用户名被占用
        if(results.length >0){
            return res.send({status:1,message:'用户名被占用，请更换其他用户名'});
        }

        const insert_sql = 'insert into users set ?';
        db.query(insert_sql,{username:userinfo.username,password:userinfo.password},(err,results) =>{
            if(err){
                return res.send({status:1,message:err.message});
            }
            if(results.affectedRows !== 1){
                return res.send({status:1,message:'注册用户失败，请稍后再试'});
            }
            res.send({status:0,message:'注册成功'});
        })
    });
}

// 登录
exports.login = (req,res) =>{
    const userinfo = req.body;
    const sql = 'select * from users where username=?';
    db.query(sql,userinfo.username,(err,results) =>{
        if(err) {
            return res.send(err);
        }
        // 判定密码是否正确
        if(results.length !== 1){
            if(userinfo.password !== results[0].password){
                return res.send('密码错误，登录失败');
            }
        }
        

        // 服务端生成Token字符串
        const user = {...results[0],password:'',user_pic:''};

        // 对用户信息加密 生成Tokend字符串
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn});
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer ' + tokenStr,
        });
    })
}