# [代码实现] 手写代码实现 promise.all

- Issue: #107
- State: open
- Labels: 代码实现/算法
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/107
- Created: 2023-03-15T13:49:06Z
- Updated: 2023-09-06T15:52:37Z

## Body

下面是手写实现 `Promise.all()` 方法的代码：

```javascript
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let count = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (result) => {
          results[index] = result;
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};
```

实现原理：

`Promise.all()` 方法接收一个包含多个 Promise 的数组作为参数，并返回一个新的 Promise。该 Promise 将会在数组中所有 Promise 状态均为 `fulfilled` 时被解决，并且以数组形式返回所有 Promise 的结果。

我们可以通过创建一个新的 Promise，然后遍历 Promise 数组并将每个 Promise 包装在一个 `Promise.resolve()` 中，然后使用 `.then()` 方法将它们的解决值和拒绝原因分别传递给新的 Promise 的 `resolve()` 和 `reject()` 方法。我们还需要维护一个计数器和一个结果数组来跟踪所有 Promise 的状态。每当一个 Promise 被解决时，我们将其结果存储在结果数组中，然后将计数器增加 1。当计数器等于 Promise 数组的长度时，说明所有 Promise 均已被解决，此时我们可以使用 `resolve()` 方法并将结果数组作为参数传递给它。如果有任何一个 Promise 被拒绝，则使用 `reject()` 方法并将其拒绝原因作为参数传递给它。

需要注意的是，如果 Promise 数组为空，则 `Promise.all()` 将立即被解决，并返回一个空数组。
