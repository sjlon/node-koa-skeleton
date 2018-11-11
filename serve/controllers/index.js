const KoaRouter = require('koa-router'),
    router = new KoaRouter();

const User = require('./user.controller');


module.exports = app => {
    // 默认请求
    router.get('/', async (ctx, next) => {
        ctx.response.type = 'html';
        ctx.response.body = '===测试===';
        await next();
    });
    //添加自定义路由
    new User(router);


    app.use(router.routes()).use(router.allowedMethods())
};