const db = require('../db/index');
const Minio = require('minio');

//获取学生信息
exports.getStudents = (req, res) => {
    // const userinfo = req.body;
    // console.log(userinfo);
    const sql = 'select * from student';
    db.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({
            data: results
        })

    })
}

//获取id学生信息
exports.getIdStudents = (req, res) => {
    const account = req.fields.account;
    console.log(account);
    const sql = 'select * from student where account=?';
    db.query(sql, account,(err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({
            data: results
        })

    })
}



//保存故障图片到minio
exports.uploadAvatar = (req, res) => {
    const file = req.files.file;
    console.log(file);
    // 文件路径
    const filePath = file.path;
    // 将文件名设置为orderId.jpg
    const fileName = req.query.orderId+'.jpg';
    // console.log(file.name);
    uploadFile(fileName, filePath);

    // 上传文件的方法
    async function uploadFile(fileName, filePath) {
        // {"console":[{"access_key":"DT9XX0DI9P0NPUSH967Q","secret_key":"+YLBPNdxZRaCA54BcoWhJJiyjCiXVsLOlE4XUU4H"}]}
        //基本配置
        let minioClient = new Minio.Client({
            endPoint: 'www.starbug.vip', // 本机内网ip
            port: 9001,
            useSSL: false, // 不需要https
            accessKey: 'DT9XX0DI9P0NPUSH967Q',  // 账号
            secretKey: '+YLBPNdxZRaCA54BcoWhJJiyjCiXVsLOlE4XUU4H' // 密码
        });
        let isExist = await minioClient.bucketExists('dormitory-bucket');
        let err = '';
        // console.log('bucket is exist>>>', isExist);
        if (!isExist) {
            //创建桶后，需要在管理界面修改public访问权限，默认是private
            err = await minioClient.makeBucket('dormitory-bucket', 'cn-north-1');
        }

        // 设置请求头格式 image/jpeg才能够在线预览
        let metaData = {
            'Content-Type': 'image/jpeg',
            'X-Amz-Meta-Testing': 1234,
            'example': 5678
        }

        if (!err) {
            //上传文件
            await minioClient.fPutObject('dormitory-bucket', fileName, filePath,metaData);

            // console.log('返回给前端的文件路径>>>', 'https://www.starbug.vip/oss/dormitory-bucket/'+fileName);
            // https://www.starbug.vip/oss/dormitory-bucket/微信图片_20220804103308.jpg
            // 'https://www.starbug.vip/oss/dormitory-bucket/' + fileName
            
            // return res.send('https://www.starbug.vip/oss/dormitory-bucket/' + fileName);
            return res.send({
                status:200,
                url:`https://www.starbug.vip/oss/dormitory-bucket/${fileName}`
            });

        }

    }

}

// 删除某个学生信息
exports.studentInfoDelete = (req, res) => {
    const orderId = req.fields.account;
    // 根据id把删除状态改为 1已删除
    const sql = 'update student set status = 1 where account = ?';
    db.query(sql, orderId, (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.send({ status: '200', message: '删除成功！' });
    })

}