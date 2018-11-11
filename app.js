// 导入koa，并创建服务器
const Koa = require('koa');
const app = new Koa();
// 配置模板引擎
const views = require('koa-views');
const json = require('koa-json');
// 格式化异常情况的页面输出
const onerror = require('koa-onerror');
// 解析表单
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

// controller
const controller = require('./serve/controllers/')

// const index = require('./serve/routes/index');
// const users = require('./serve/routes/users');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
// 托管静态资源
app.use(require('koa-static')(__dirname + '/serve/public'));

// 配置模板引擎
app.use(views(__dirname + '/serve/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());
controller(app);


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
