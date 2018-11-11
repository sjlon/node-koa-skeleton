const basService = require('./_bas.service');
const schema = require('../models/user.schema');

class UserService extends basService {
    constructor () {
        super('User', schema);
    }



    /**
     * 手机号验证码登录，不存在则注册
     * @param {Object} params
     * @param {String} params.phone - 手机号
     * @param {String} params.authCode - 验证码
     * @param {String} params.nickName - 昵称
     * @param {Number} params.gender - 性别（1：男，0：女）
     * @param {String} params.avatarUrl - 头像地址
     * @param {Object} params.openid - 微信openid
     * @return {Promise}
     */
    async login (params) {
        if (!params.phone && !params.openid) throw '手机号或openid不能为空';
        let code = params.authCode || 'x';
        // 验证短信验证码是否正确
        let result = await this.smsService.checkCode(params.phone, code);
        if (!result) return Promise.reject('请输入有效验证码!');

        // 获取白名单信息
        let whiteUser = await this.getWhiteUser(params.phone);

        let userData = await this.findOne({phone: params.phone});
        if (userData && !userData.isAcitved) {
            // 被主动关闭的用户
            throw '账号已被锁定，请联系管理员';
        } else if (userData) {
            // 已注册用户通过验证码登录
            this.update({
                _id: userData._id,
                web1: 'www.' + whiteUser.url,
                wxopenid2: params.openid
            });
            return userData;
        } else {
            // 注册用户
            return this.signIn({
                name: params.nickName,
                sex: params.gender === 1 ? 0 : 1,
                icon: params.avatarUrl,
                webSite: 'www.' + whiteUser.url,
                companyName: whiteUser.companyName,
                ...params
            });
        }
    }
}

module.exports = UserService;