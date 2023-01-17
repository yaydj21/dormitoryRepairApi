const db = require('../db/index');

//获取通知信息
exports.getNotices = (req,res) =>{
    // const userinfo = req.body;
    // console.log(userinfo);
    const sql = 'select * from notice';
    db.query(sql,(err,results) =>{
        if(err) {
            return res.send(err);
        }
        res.send({
            data:results
        })

    })
}

//删除通知信息
exports.deleteNotices = (req,res) =>{
    const id = req.body.id;
    // 根据id把删除状态改为 1已删除
    // console.log(id);
    const sql = 'update notice set status = 1 where id = ?';
    db.query(sql,id,(err,results) =>{
        if(err){
            return res.send(err);
        }
        res.send({status:'200',message:'删除成功！'});
    })

}