# [koa] 在没有async await 的时候, koa是怎么实现的洋葱模型？

- Issue: #168
- State: open
- Labels: web框架
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/168
- Created: 2023-03-26T07:51:12Z
- Updated: 2023-03-26T07:51:12Z

## Body

在没有 `async/await` 的时候，Koa 通过使用 ES6 的生成器函数来实现洋葱模型。具体来说，Koa 中间件函数是一个带有 `next` 参数的生成器函数，当中间件函数调用 `next` 方法时，它会挂起当前的执行，转而执行下一个中间件函数，直到执行完最后一个中间件函数，然后将执行权返回到前一个中间件函数，继续执行下面的代码。这个过程就像一层一层剥开洋葱一样，因此被称为洋葱模型。

下面是一个使用生成器函数实现的简单的 Koa 中间件函数：

```javascript
function* myMiddleware(next) {
  // 中间件函数的代码
  console.log('Start');
  yield next;
  console.log('End');
}
```

在这个中间件函数中，`yield next` 表示挂起当前的执行，执行下一个中间件函数。假设我们有两个中间件函数 `middleware1` 和 `middleware2`，它们的代码如下：

```javascript
function* middleware1(next) {
  console.log('middleware1 Start');
  yield next;
  console.log('middleware1 End');
}

function* middleware2(next) {
  console.log('middleware2 Start');
  yield next;
  console.log('middleware2 End');
}
```

我们可以使用 `compose` 函数将它们组合成一个洋葱模型：

```scss
scssCopy codeconst compose = require('koa-compose');

const app = compose([middleware1, middleware2]);

app();
```

在这个例子中，`compose` 函数将 `middleware1` 和 `middleware2` 组合成一个函数 `app`，然后调用这个函数即可执行整个中间件链。执行的结果如下：

```sql
sqlCopy codemiddleware1 Start
middleware2 Start
middleware2 End
middleware1 End
```

可以看到，这个结果与洋葱模型的特点相符。
