# Promise finally 怎么实现的？

`Promise.finally()` 方法是在 ES2018 中引入的，用于指定不管 Promise 状态如何都要执行的回调函数。与 `Promise.then()` 和 `Promise.catch()` 不同的是，`Promise.finally()` 方法不管 Promise 是成功还是失败都会执行回调函数，而且不会改变 Promise 的状态。如果返回的值是一个 Promise，那么 `Promise.finally()` 方法会等待该 Promise 执行完毕后再继续执行。

`Promise.finally()` 方法的实现思路如下：

1. `Promise.finally()` 方法接收一个回调函数作为参数，返回一个新的 Promise 实例。

2. 在新的 Promise 实例的 `then()` 方法中，首先调用原 Promise 的 `then()` 方法，将原 Promise 的结果传递给下一个 `then()` 方法。

3. 在新的 Promise 实例的 `then()` 方法中，调用回调函数并将原 Promise 的结果传递给回调函数。

4. 如果回调函数返回一个 Promise，则需要在新的 Promise 实例的 `then()` 方法中等待该 Promise 执行完毕，再将结果传递给下一个 `then()` 方法。

5. 在新的 Promise 实例的 `finally()` 方法中，返回一个新的 Promise 实例。

下面是一个简单的实现示例：

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
}
```

这个实现方法中，使用了 `Promise.resolve()` 来返回一个新的 Promise 实例，因此可以避免了 Promise 链的状态改变。另外，由于 `finally()` 方法只是在 Promise 链的最后执行回调函数，因此不需要使用异步函数。