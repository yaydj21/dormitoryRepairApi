const db = require('../db/index');

//获取维修员信息
exports.getmaintainers = (req,res) =>{
    const sql = 'select * from maintainer';
    db.query(sql,(err,results) =>{
        if(err) {
            return res.send(err);
        }
        res.send({
            data:results
        })

    })
}

// 删除某个维修员信息
exports.maintainerInfoDelete = (req, res) => {
    const orderId = req.fields.account;
    // 根据id把删除状态改为 1已删除
    const sql = 'update maintainer set status = 1 where account = ?';
    db.query(sql, orderId, (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({ status: '200', message: '删除成功！' });
    })

}