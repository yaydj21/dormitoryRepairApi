const express = require('express');

// 创建路由对象
const router = express.Router();

// 导入文章路由处理函数
const articlesHandler = require('../router_handler/artilces_handler');

// 获取推荐文章内容
router.get('/articles/:art_id',articlesHandler.getArticles);

// 获取娱乐文章内容
router.get('/funArticles/:art_id',articlesHandler.getFunArticles);

// 获取游戏文章内容
router.get('/gameArticles/:art_id',articlesHandler.getGameArticles);

// 获取体育文章内容
router.get('/sportsArticles/:art_id',articlesHandler.getSportsArticles);

module.exports = router;

