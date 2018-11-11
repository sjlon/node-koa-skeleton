const { Schema } = require('mongoose');

const userSchema = new Schema({
    //名字
    name: {
        type: String
    },
    //头像
    icon: {
        type: String
    },
    //性别 0男1女
    sex: {
        type: Number,
        default: 0
    },
    //生日
    birthday: {
        type: Date
    },
    //手机
    phone: {
        type: String,
        // unique: true //唯一
    },
});

module.exports = userSchema;