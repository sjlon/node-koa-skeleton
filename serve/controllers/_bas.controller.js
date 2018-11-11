
class BasController {
    constructor (namespace = '/', router) {
        this.namespace = namespace;
        this.router = router;

        this.addRoute('get', this.getItem);
        this.addRoute('post', this.saveItem);
        this.addRoute('delete', this.removeItem);
    }
    addRoute(method, handler, uri = '') {
        this.router[method](this.namespace + uri , this.httpWrapper(handler))
    }

    addRawRoute(method, handler, uri = '') {
        this.router[method](this.namespace + uri, handler.bind(this));
    }

    httpWrapper (handler) {
        return async (ctx, next) => {
            try {
            //    初始化
                ctx.params = ctx.query;
                ctx.data = ctx.request.body;
                let result = handler.call(this, ctx, ctx.method === 'GET' ? ctx.params : ctx.data);

                //是否使用传统方式
                if (ctx.respond === false) return;

                let data = null;

            //    如果执行的结果是Promise，则通过await优化处理
                if (result instanceof Promise) {
                    data = await result;
                } else {
                    data = result;
                }

                ctx.status = 200;
            //    fanhui执行结果
                ctx.body = {
                    isSuccess: true,
                    data: data
                };

            } catch(err) {
                let errorMessage = err.message || err;
                //默认为201
                ctx.status = 201;
                ctx.body = {isSuccess: false, error: errorMessage};

            }
            await next();
        }
    }

    getItem(context) {
        context.status = 501;
        // BasController.logRouteError('get: /%s 没有实现！', this.name);
        throw 'NOT IMPLEMENT';
    }

    saveItem(context) {
        context.status = 501;
        // BasController.logRouteError('post: /%s 没有实现！', this.name);
        return Promise.resolve('NOT IMPLEMENT');
    }

    removeItem(context) {
        context.status = 501;
        // BasController.logRouteError('delete: /%s 没有实现！', this.name);
        throw 'NOT IMPLEMENT';
    }

}

module.exports = BasController;