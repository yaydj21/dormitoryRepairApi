const db = require('../db/index');

//获取通知信息
exports.getRepairOrders = (req,res) =>{
    // const userinfo = req.body;
    // console.log(userinfo);
    const sql = 'select * from `repairOrder`';
    db.query(sql,(err,results) =>{
        if(err) {
            return res.send(err);
        }
        res.send({
            data:results
        })

    })
}