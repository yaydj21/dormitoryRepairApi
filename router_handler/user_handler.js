const db = require('../db/index');

// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken');

// 导入全局的配置文件
const config = require('../config');

// 注册
exports.register = (req, res) => {

    const userinfo = req.fields;
    console.log(userinfo);
    // 对表单的数据,进行合法性校验
    if (!userinfo.account || !userinfo.password) {
        return res.send({ status: 1, message: '用户名或密码不合法' });
    }
    //1为维修员 2为学生
    let sql = '';
    let insert_sql = '';
    if (userinfo.role === '1') {
        sql = 'select * from maintainer where account =?';
        insert_sql = 'insert into maintainer set ?';
    } else if (userinfo.role === '2') {
        sql = 'select * from student where account =?';
        insert_sql = 'insert into student set ?';
    } else {
        return res.send({ status: 1, message: '类型不对' });
    }
    db.query(sql, [userinfo.account], (err, results) => {
        // 执行sql语句失败
        if (err) {
            return res.send({ status: 1, message: err.message });
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.send({ status: 1, message: '账号被占用，请联系管理员处理或更换账号' });
        }

        db.query(insert_sql, { account: userinfo.account, password: userinfo.password }, (err, results) => {
            if (err) {
                return res.send({ status: 1, message: err.message });
            }
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '注册用户失败，请稍后再试' });
            }
            res.send({ status: 0, message: '注册成功' });
        })
    });
}

// 登录
exports.login = (req, res) => {
    const userinfo = req.fields;
    console.log(userinfo);
    //0为管理员 1为维修员 2为学生
    let sql = '';
    if (userinfo.role === '0') {
        sql = 'select * from admin where account =?';
    } else if (userinfo.role === '1') {
        sql = 'select * from maintainer where account =?';
    } else if (userinfo.role === '2') {
        sql = 'select * from student where account =?';
    } else {
        return res.send({ status: 1, message: '类型不对' });
    }
    
    // const sql = 'select * from users where username=?';
    db.query(sql, userinfo.account, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: '登录失败'
            });
        }
        console.log(results);
        if (results.length === 0) {
            return res.send({
                status: 1,
                message: '登录失败，请检查你的账号和身份是否匹配'
            });
        }
        // 判定密码是否正确
        if (results.length !== 1) {
            if (userinfo.password !== results[0].password) {
                return res.send({
                    status: 1,
                    message: '密码错误，登录失败'
                });
            }
        }


        // 服务端生成Token字符串
        const user = { ...results[0], password: '', role: userinfo.role };

        // 对用户信息加密 生成Tokend字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn });
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr,
        });
    })
}


// 修改用户基本信息的路由
exports.updateUserInfo = (req, res) => {
    const userInfo = req.fields;
    console.log(req.fields);
    // 判断权限 0为管理员 1为维修员 2为学生
    // 权限是管理员
    if (userInfo.role === '0') {
        // 如果要修改维修员信息
        if (userInfo.updateRole === '1') {
            const sql = `UPDATE maintainer SET account = ?, password = ?, name = ?, telNum = ?, department = ?, sex = ?, enable = ? WHERE account = ?;`
            const val = [userInfo.account, userInfo.password, userInfo.name, userInfo.telNum, userInfo.department, userInfo.sex, userInfo.enable, userInfo.account]
            db.query(sql, val, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.send({
                        status: 1,
                        message: '维修员信息修改失败'
                    });
                } else {
                    res.send({
                        status: 0,
                        message: '维修员信息修改成功'
                    });
                }

            })
        }
        // 如果要修改学生信息
        if (userInfo.updateRole === '2') {
            const sql = `UPDATE student SET account = ?, password = ?, name = ?, college = ?, class = ?, email = ?, telNum = ?, address = ? WHERE account = ?;`
            const val = [userInfo.account, userInfo.password, userInfo.name, userInfo.college, userInfo.class, userInfo.email, userInfo.telNum, userInfo.address, userInfo.account]
            db.query(sql, val, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.send({
                        status: 1,
                        message: '学生信息修改失败'
                    });
                } else {
                    res.send({
                        status: 0,
                        message: '学生信息修改成功'
                    });
                }

            })
        }
    }
    // 权限是维修员
    if (userInfo.role === '1') {
        const sql = `UPDATE maintainer SET name = ?, telNum = ?, department = ?, sex = ? WHERE account = ?;`
        const val = [userInfo.name, userInfo.telNum, userInfo.department, userInfo.sex, userInfo.account]
        db.query(sql, val, (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: '修改失败'
                });
            } else {
                res.send({
                    status: 0,
                    message: '修改成功'
                });
            }

        })
    }
    // 权限是学生
    if (userInfo.role === '2') {
        const sql = `UPDATE student SET name = ?, college = ?, class = ?, email = ?, telNum = ?, address = ? WHERE account = ?;`
        const val = [userInfo.name, userInfo.college, userInfo.class, userInfo.email, userInfo.telNum, userInfo.address, userInfo.account]
        db.query(sql, val, (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: '修改失败'
                });
            } else {
                res.send({
                    status: 0,
                    message: '修改成功'
                });
            }

        })
    }
}


