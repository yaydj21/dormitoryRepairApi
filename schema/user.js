// 导入定义验证规则的包
const joi = require('joi');

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */


// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

// 定义id,nickname,email的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const user_email = joi.string().email().required();

// 定义验证avatar头像的验证规则
const avatar = joi.string().dataUri().required();

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema= {
    body:{
        username,
        password,
    }
}

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    body:{
        id,//如果表单传过来的属性和这里的属性名不同 就不能简写要写成属性名 如email:user_email
        nickname,
        email:user_email,
    }
}

// 验证规则对象 - 更新密码
exports.update_password_schema = {
    body:{
        oldPwd:password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password),
    }
}

// 验证规则对象 - 头像
exports.update_avatar_schma = {
    body:{
        avatar
    }
}

