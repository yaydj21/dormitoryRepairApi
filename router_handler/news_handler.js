const db = require('../db/index');

//获取推荐新闻
exports.getNews = (req,res) =>{
    const userinfo = req.body;
    console.log(userinfo);
    const sql = 'select * from news';
    db.query(sql,userinfo.username,(err,results) =>{
        if(err) {
            return res.send(err);
        }
        res.send({
            data:results
        })

    })
}

//获取娱乐新闻
exports.getFunNews = (req,res) =>{
    const userinfo = req.body;
    console.log(userinfo);
    const sql = 'select * from funNews';
    db.query(sql,userinfo.username,(err,results) =>{
        if(err) {
            return res.send(err);
        }
        res.send({
            data:results
        })

    })
}

//获取游戏新闻
exports.getGameNews = (req,res) =>{
    const userinfo = req.body;
    console.log(userinfo);
    const sql = 'select * from gameNews';
    db.query(sql,userinfo.username,(err,results) =>{
        if(err) {
            return res.send(err);
        }
        res.send({
            data:results
        })

    })
}

//获取体育新闻
exports.getSportsNews = (req,res) =>{
    const userinfo = req.body;
    console.log(userinfo);
    const sql = 'select * from sportsNews';
    db.query(sql,userinfo.username,(err,results) =>{
        if(err) {
            return res.send(err);
        }
        res.send({
            data:results
        })

    })
}