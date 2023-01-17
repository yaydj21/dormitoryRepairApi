const express = require('express');

const router = express.Router();

const newsHandler = require('../router_handler/news_handler');

// 推荐新闻接口
router.get('/news',newsHandler.getNews);

// 推荐娱乐新闻接口
router.get('/fun_news',newsHandler.getFunNews);

// 推荐游戏新闻接口
router.get('/game_news',newsHandler.getGameNews);

// 推荐体育新闻接口
router.get('/sports_news',newsHandler.getSportsNews);


module.exports = router;