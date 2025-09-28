# 手写实现 Promise.allSettled

- Issue: #108
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/108
- Created: 2023-03-15T13:57:05Z
- Updated: 2023-03-15T13:57:06Z

## Body

`Promise.allSettled` 方法会接收一个 Promise 数组，并返回一个新的 Promise 对象。该新 Promise 对象会在所有输入的 Promise 都被 resolved 或 rejected 后变为 settled 状态，并且它的值是一个包含所有 Promise 状态的对象数组。

以下是手写实现 `Promise.allSettled` 方法的代码：

```javascript
function allSettled(promises) {
  return new Promise((resolve) => {
    const results = [];
    let settledCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          results[index] = { status: 'fulfilled', value };
        },
        (reason) => {
          results[index] = { status: 'rejected', reason };
        }
      ).finally(() => {
        settledCount++;

        if (settledCount === promises.length) {
          resolve(results);
        }
      });
    });
  });
}
```

上述代码中，我们首先创建一个新的 Promise 对象，并在其中执行了一个异步操作。然后我们遍历了传入的 Promise 数组，并为每个 Promise 添加了一个 `then` 方法的回调函数，以便在 Promise 状态发生变化时收集 Promise 的结果。对于每个 Promise，我们都使用 `Promise.resolve` 方法将其转换为 Promise 对象，以确保我们处理的是 Promise 对象。我们使用一个 `finally` 方法来在 Promise settled 时更新 settledCount，以确保在所有 Promise settled 后我们只会执行一次 `resolve` 方法。

最终，我们将所有 Promise 的状态都收集到了 `results` 数组中，并将该数组作为 Promise 的值解析。这样，我们就实现了 `Promise.allSettled` 方法的功能。
