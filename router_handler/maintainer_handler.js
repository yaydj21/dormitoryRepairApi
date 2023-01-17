const db = require('../db/index');

//获取通知信息
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