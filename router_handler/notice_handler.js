const db = require('../db/index');

//获取通知信息
exports.getNotices = (req, res) => {
    // const userinfo = req.body;
    // console.log(userinfo);
    const sql = 'select * from notice';
    db.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({
            data: results
        })

    })
}

// 修改通知信息
exports.updateNotices = (req, res) => {
    const noticeInfo = req.fields;
    // const val = [userInfo.account, userInfo.password, userInfo.name, userInfo.telNum, userInfo.department, userInfo.sex, userInfo.enable, userInfo.account]
    // const sql = 'update notice set status = 1 where id = ?';
    const sql = `UPDATE notice SET title = ?, content = ?, time = ? WHERE id = ?;`
    const val = [noticeInfo.title, noticeInfo.content, noticeInfo.time, noticeInfo.id];
    db.query(sql, val, (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({
            status:0,
            message:'修改成功'
        })
    })
    console.log(noticeInfo);
}
//删除通知信息
exports.deleteNotices = (req, res) => {
    // console.log(req.fields.id);
    // 跟express-formidable插件有冲突 express-formidable也能解析pplication/x-www-form-urlencoded格式的表单数据
    // 所以用express-formidable 不用express.urlencoded解析了 
    const id = req.fields.id;
    // 根据id把删除状态改为 1已删除
    const sql = 'update notice set status = 1 where id = ?';
    db.query(sql, id, (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({ status: '200', message: '删除成功！' });
    })

}


// 增加某个通知信息
exports.addNotice = (req, res) => {
    const noticeInfo = req.fields;
    const sql = `INSERT INTO notice (title, content, time) VALUES(?, ?, ?)`
    const val = [noticeInfo.title, noticeInfo.content, noticeInfo.time]
    console.log(noticeInfo);
    db.query(sql, val, (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send({ status: '200', message: '添加成功！' });
    });
}