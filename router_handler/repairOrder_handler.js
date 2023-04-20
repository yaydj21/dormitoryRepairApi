const db = require('../db/index');

//辅助函数
// 获取日期字符串，格式为 yyyy-MM-dd
function getDateString(date) {
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    return `${year}-${month}-${day}`;
}

// 将数字补齐成两位数，不足的在前面补0
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// 获取订单时间的索引，如果订单时间不在近7天内，返回-1
function getIndex(orderId) {
    const orderDate = new Date(
        `${orderId.substring(0, 4)}-${orderId.substring(4, 6)}-${orderId.substring(6, 8)}`
    );
    const nowDate = new Date();
    const diffDays = Math.floor((nowDate - orderDate) / (24 * 60 * 60 * 1000));
    return diffDays < 7 ? 6 - diffDays : -1;
}

//获取全部维修订单信息
exports.getRepairOrders = (req, res) => {
    // const userinfo = req.body;
    // console.log(userinfo);
    const sql = 'select * from `repairOrder`';
    db.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({
            data: results
        })

    })
}

//获取我的维修订单信息
exports.getMyRepairOrders = (req, res) => {
    const userInfo = req.fields;
    console.log(userInfo);
    const sql = `select * from repairOrder where applicant = ?`;
    db.query(sql, userInfo.account, (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({
            data: results
        })

    })
}

// 获取某个维修信息
exports.getRepairIdOrderInfo = (req, res) => {
    const orderId = req.fields.orderId;
    const sql = `select * from repairOrder where orderId = ?`;
    db.query(sql, orderId, (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({
            data: results
        })

    })
}

// 修改某个维修订单信息
exports.updateRepairIdOrderInfo = (req, res) => {
    const orderInfo = req.fields;
    // 判断权限 0为管理员
    // 权限是管理员
    // if (orderInfo.role === '0') {
        // 如果要修改订单信息
        console.log(orderInfo.faultType);
        const sql = `UPDATE repairOrder SET orderId = ?, content = ?, address = ?, applicant = ?, telNum = ?, email = ?, faultPicture = ?,status = ?,faultType = ? WHERE orderId = ?;`
        const val = [orderInfo.orderId, orderInfo.content, orderInfo.address, orderInfo.applicant, orderInfo.telNum, orderInfo.email, orderInfo.faultPicture, orderInfo.status,orderInfo.faultType, orderInfo.orderId]
        db.query(sql, val, (err, results) => {
            if (err) {
                console.log(err);
                return res.send({
                    status: 1,
                    message: '订单信息修改失败'
                });
            } else {
                res.send({
                    status: 0,
                    message: '订单信息修改成功'
                });
            }

        })
    // } else {
    //     res.send({
    //         status: 1,
    //         message: '只有管理员才能修改'
    //     })
    // }
}

// 删除某个订单信息
exports.orderDataDelete = (req, res) => {
    const orderId = req.fields.orderId;
    // 根据id把删除状态改为 1已删除
    const sql = 'update repairOrder set deleteStatus = 1 where orderId = ?';
    db.query(sql, orderId, (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({ status: '200', message: '删除成功！' });
    })

}

// 增加某个订单信息
exports.addOrder = (req, res) => {
    // const { orderName, orderTime, orderType, orderContent, orderStatus } = req.body;
    // const sql = INSERT INTO orders (orderName, orderTime, orderType, orderContent, orderStatus) VALUES(?, ?, ?, ?, ?);
    const orderInfo = req.fields;
    const sql = `INSERT INTO repairOrder (content, address, telNum, applicant, email,faultType,orderId,status,faultPicture) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const val = [req.fields.content, req.fields.address, req.fields.telNum, req.fields.applicant,
        req.fields.email,req.fields.faultType,req.fields.orderId,req.fields.status,req.fields.faultPicture]
    console.log(orderInfo);
    db.query(sql, val, (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send({ status: '200', message: '添加成功！' });
    });
}


// 获取首页展示标签的数据
exports.getHomeRepairTag = (req, res) => {
    // 获取今天的日期
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}${month}${day}`;

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const firstDayString = `${year}-${month}-01`;
    const lastDayString = `${year}-${month}-${lastDay.getDate()}`;
    // 获取今日报修数量
    const sql1 = `SELECT COUNT(*) AS count FROM repairOrder WHERE DATE(orderId) = '${todayString}'AND deleteStatus = 0;`;

    // 获取今日已维修数量
    const sql2 = `SELECT COUNT(*) AS count FROM repairOrder WHERE DATE(orderId) = '${todayString}' AND status = 2 AND deleteStatus = 0;`;

    // 获取今日未维修数量
    const sql3 = `SELECT COUNT(*) AS count FROM repairOrder WHERE DATE(orderId) = '${todayString}' AND status = 0 AND deleteStatus = 0;`;

    // 获取本月报修数量
    const sql4 = `SELECT COUNT(*) AS count FROM repairOrder WHERE DATE(orderId) >= '${firstDayString}' AND DATE(orderId) <= '${lastDayString}' AND deleteStatus = 0;`;

    // 获取本月已维修数量
    const sql5 = `SELECT COUNT(*) AS count FROM repairOrder WHERE DATE(orderId) >= '${firstDayString}' AND DATE(orderId) <= '${lastDayString}' AND status = 2 AND deleteStatus = 0;`;

    // 获取本月未维修数量
    const sql6 = `SELECT COUNT(*) AS count FROM repairOrder WHERE DATE(orderId) >= '${firstDayString}' AND DATE(orderId) <= '${lastDayString}' AND status = 0 AND deleteStatus = 0;`;

    // 查询今日报修数量
    db.query(sql1 + sql2 + sql3 + sql4 + sql5 + sql6, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const count = [{
                name: "今日报修数量",
                value: results[0][0].count,
                icon: "success",
                color: "#2ec7c9",
            },
            {
                name: "今日修理数量",
                value: results[1][0].count,
                icon: "success",
                color: "#5ab1ef",
            },
            {
                name: "今日未维修数量",
                value: results[2][0].count,
                icon: "success",
                color: "#ffb980",
            },
            {
                name: "本月报修数量",
                value: results[3][0].count,
                icon: "success",
                color: "#2ec7c9",
            },
            {
                name: "本月修理数量",
                value: results[4][0].count,
                icon: "success",
                color: "#5ab1ef",
            },
            {
                name: "本月未维修数量",
                value: results[5][0].count,
                icon: "success",
                color: "#ffb980",
            }];
            res.json(count);
        }
    });
}


// 获取近7天的报修类型
exports.getRepairOrders7Days = (req, res) => {
    const sql = 'SELECT faultType, orderId FROM repairOrder WHERE DATE(orderId) >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND deleteStatus = 0';
    db.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }

        // 初始化统计数据
        const statisticsData = {};
        const faultTypes = ['水电故障', '网络故障', '门锁故障', '空调故障', '其他'];
        const dateList = Array.from({ length: 7 }).map((_, index) => getDateString(new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000))); for (let i = 0; i < faultTypes.length; i++) {
            statisticsData[faultTypes[i]] = Array.from({ length: 7 }).map((_, index) => ({
                date: getDateString(new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000)),
                count: 0
            }));
        }

        // 遍历查询结果
        for (let i = 0; i < results.length; i++) {
            const faultType = results[i].faultType;
            const orderId = results[i].orderId;
            const index = getIndex(orderId);

            if (statisticsData[faultType] && index >= 0) {
                statisticsData[faultType][index].count++;
            }
        }

        // 处理数据格式，转换为echarts折线图需要的格式
        const chartData = [];
        for (let i = 0; i < faultTypes.length; i++) {
            const typeData = statisticsData[faultTypes[i]];
            const countData = [];
            for (let j = 0; j < typeData.length; j++) {
                countData.push(typeData[j].count);
            }
            chartData.push({
                name: faultTypes[i],
                type: 'line',
                stack: "Total",
                data: countData
            });
        }

        // 返回数据给前端
        res.json({
            dateList,
            chartData
        });
    });
};


// 获取今日报修的类型
exports.getTodayRepairTypesRepairCount = (req, res) => {
    // 获取今天的日期
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}${month}${day}`;
    const sql = `SELECT faultType, COUNT(*) as count FROM repairOrder WHERE DATE(orderId) = '${todayString}' AND deleteStatus = 0 GROUP BY faultType`;

    db.query(sql, (error, results, fields) => {
        if (error) throw error;
        const types = {
            '水电故障': 0,
            '网络故障': 0,
            '门锁故障': 0,
            '空调故障': 0,
            '其他': 0
        };
        results.forEach(result => {
            const type = result.faultType || '其他';
            types[type] = result.count;
        });
        res.send(types);
    });

}

// 获取本月和上个月报修的类型接口 
exports.getMonthRepairTypesRepairCount = (req, res) => {
    // 获取今天的日期
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');

    const lastDay = new Date(year, month - 1, 0);
    const lastMonth = `${year}-${month - 1}-01`;//月初
    const lastMonthLastDayString = `${year}-${month - 1}-${lastDay.getDate()}`;//2-28 月末

    const thisMonthLastDay = new Date(year, month, 0);
    const thisMonth = `${year}-${month}-01`;//月初
    const thisMonthLastDayString = `${year}-${month}-${thisMonthLastDay.getDate()}`;//3-31 月末
    // 上个月
    const sql1 = `SELECT faultType, orderId FROM repairOrder WHERE DATE(orderId) >= '${lastMonth}' AND DATE(orderId) <= '${lastMonthLastDayString}' AND deleteStatus = 0;`;
    // 本月
    const sql2 = `SELECT faultType, orderId FROM repairOrder WHERE DATE(orderId) >= '${thisMonth}' AND DATE(orderId) <= '${thisMonthLastDayString}' AND deleteStatus = 0;`;

    db.query(sql1 + sql2, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // 统计上个月和本月的数据方法
            function count(arr) {
                const countLast = {
                    "water": 0,
                    "network": 0,
                    "door": 0,
                    "kongtiao": 0,
                    "other": 0
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].faultType === '水电故障') {
                        countLast.water++;
                    }
                    if (arr[i].faultType === '网络故障') {
                        countLast.network++;
                    }
                    if (arr[i].faultType === '门锁故障') {
                        countLast.door++;
                    }
                    if (arr[i].faultType === '空调故障') {
                        countLast.kongtiao++;
                    }
                    if (arr[i].faultType === '其它') {
                        countLast.other++;
                    }
                }
                return countLast;
            }
            const countLast = count(results[0]);
            const countMonth = count(results[1]);

            const source = [
                ["月份", "上个月", "本月"],
                ["水电故障", countLast.water, countMonth.water],
                ["网络故障", countLast.network, countMonth.network],
                ["门锁故障", countLast.door, countMonth.door],
                ["空调故障", countLast.kongtiao, countMonth.kongtiao],
                ["其它", countLast.other, countMonth.other],
            ];
            res.json(source);
        }
    });
}

// 获取系统全部报修的类型接口
exports.getAllRepairTypesRepairCount = (req, res) => {
    db.query(`SELECT faultType, orderId FROM repairOrder where deleteStatus = 0;`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // 统计数据方法
            function count(arr) {
                const countLast = {
                    "water": 0,
                    "network": 0,
                    "door": 0,
                    "kongtiao": 0,
                    "other": 0
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].faultType === '水电故障') {
                        countLast.water++;
                    }
                    if (arr[i].faultType === '网络故障') {
                        countLast.network++;
                    }
                    if (arr[i].faultType === '门锁故障') {
                        countLast.door++;
                    }
                    if (arr[i].faultType === '空调故障') {
                        countLast.kongtiao++;
                    }
                    if (arr[i].faultType === '其它') {
                        countLast.other++;
                    }
                }
                return countLast;
            }
            const countAll = count(results);
            const soure = [
                { value: countAll.water, name: "水电故障" },
                { value: countAll.network, name: "网络故障" },
                { value: countAll.door, name: "门锁故障" },
                { value: countAll.kongtiao, name: "空调故障" },
                { value: countAll.other, name: "其它" },
            ]
            res.json(soure);
        }
    });
}


