# [koa] body-parser 中间件实现原理？

- Issue: #169
- State: open
- Labels: web框架
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/169
- Created: 2023-03-26T07:53:06Z
- Updated: 2023-03-26T07:53:06Z

## Body

Koa 中间件 `koa-bodyparser` 的原理是将 HTTP 请求中的 `request body` 解析成 JavaScript 对象，并将其挂载到 `ctx.request.body` 属性上，方便后续的处理。

具体来说，`koa-bodyparser` 中间件会监听 HTTP 请求的 `data` 事件和 `end` 事件，然后将请求中的数据流解析成一个 JavaScript 对象，并将其作为参数传递给 `ctx.request.body` 属性，最后调用 `await next()`，将控制权交给下一个中间件。

在实现过程中，`koa-bodyparser` 中间件会根据请求头中的 `Content-Type` 字段来判断请求体的类型，支持解析的请求体类型有 `application/json`、`application/x-www-form-urlencoded` 和 `multipart/form-data`。对于其他类型的请求体，`koa-bodyparser` 会将其解析成一个空对象 `{}`。

下面是一个简单的 `koa-bodyparser` 中间件的实现示例：

```javascript
function bodyParser() {
  return async (ctx, next) => {
    if (ctx.request.method === 'POST' || ctx.request.method === 'PUT') {
      let data = '';
      ctx.req.on('data', (chunk) => {
        data += chunk;
      });
      ctx.req.on('end', () => {
        if (ctx.request.headers['content-type'] === 'application/json') {
          ctx.request.body = JSON.parse(data);
        } else if (ctx.request.headers['content-type'] === 'application/x-www-form-urlencoded') {
          ctx.request.body = querystring.parse(data);
        } else if (ctx.request.headers['content-type'].startsWith('multipart/form-data')) {
          // 解析 multipart/form-data 请求体
          // ...
        } else {
          ctx.request.body = {};
        }
        return next();
      });
    } else {
      return next();
    }
  };
}
```

在这个实现中，如果请求方法为 `POST` 或者 `PUT`，则开始监听 `data` 事件和 `end` 事件，将请求体数据解析成一个 JavaScript 对象并挂载到 `ctx.request.body` 上，最后调用 `next()` 将控制权交给下一个中间件。对于其他请求方法，则直接调用 `next()` 交给下一个中间件处理。注意，这个实现只支持解析 `application/json` 和 `application/x-www-form-urlencoded` 类型的请求体，对于其他类型的请求体需要进行特殊处理。
