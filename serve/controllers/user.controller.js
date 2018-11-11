const basController = require('./_bas.controller');
const Service = require('../services/user.service'),
    service = new Service();

class UserController extends basController {
    constructor (router) {
        super('user', router);

        this.addRoute('post', this.login, '/login');
    }

    login (ctx) {
        return service.login(ctx.data);
    }
}

module.exports = UserController;