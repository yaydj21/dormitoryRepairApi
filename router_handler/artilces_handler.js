const db = require('../db/index');

// 获取推荐文章
exports.getArticles = (req,res) =>{
    const articlesinfo = req.params;
    const sql = 'select * from articles where art_id = ?';
    db.query(sql,articlesinfo.art_id,(err,results) =>{
        if(err){
            return res.send(err);
        }
        res.send({
            message:'ok',
            data:results,
        })
    })
}

// 获取娱乐文章
exports.getFunArticles = (req,res) =>{
    const articlesinfo = req.params;
    const sql = 'select * from funArticles where art_id = ?';
    db.query(sql,articlesinfo.art_id,(err,results) =>{
        if(err){
            return res.send(err);
        }
        res.send({
            message:'ok',
            data:results,
        })
    })
}

// 获取游戏文章
exports.getGameArticles = (req,res) =>{
    const articlesinfo = req.params;
    const sql = 'select * from gameArticles where art_id = ?';
    db.query(sql,articlesinfo.art_id,(err,results) =>{
        if(err){
            return res.send(err);
        }
        res.send({
            message:'ok',
            data:results,
        })
    })
}

// 获取体育文章
exports.getSportsArticles = (req,res) =>{
    const articlesinfo = req.params;
    const sql = 'select * from sportsArticles where art_id = ?';
    db.query(sql,articlesinfo.art_id,(err,results) =>{
        if(err){
            return res.send(err);
        }
        res.send({
            message:'ok',
            data:results,
        })
    })
}