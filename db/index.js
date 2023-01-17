// 导入mysql模块
const mysql = require('mysql');

const db = mysql.createPool({
    host:'123.56.154.63',
    user:'root',
    password:'9695f03978804617955a6643b6b49601',
    database:'dormitory_repair_db'
})

module.exports = db;