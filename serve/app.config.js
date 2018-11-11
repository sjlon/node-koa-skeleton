/*
* 服务器连接配置
* */
const config = require('./config')
class Config {
    static get(key) {
        return key ? config[key] : config
    }

    static getDBPath() {
        return this.get('DB_HOST') + ':' + this.get('DB_PORT') + '/' + this.get('DB_DATABASS');
    }
}

module.exports = Config;