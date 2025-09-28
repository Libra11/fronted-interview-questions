# promise.race、promise.all、promise.allSettled 有哪些区别？

- Issue: #105
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/105
- Created: 2023-03-15T13:43:12Z
- Updated: 2023-03-15T13:43:44Z

## Body

`Promise.race()`、`Promise.all()`、`Promise.allSettled()` 都是 JavaScript 中的 Promise 相关 API，它们的区别如下：

1. `Promise.race()`

`Promise.race()` 接收一个包含多个 Promise 的数组作为参数，返回一个新的 Promise。该 Promise 将会在数组中的任意一个 Promise 状态变为 `fulfilled` 或 `rejected` 时被解决，且以第一个解决的 Promise 的结果作为其结果返回。

如果数组中所有 Promise 都被拒绝，则返回的 Promise 将会以最先被拒绝的 Promise 的原因作为其原因拒绝。

2. `Promise.all()`

`Promise.all()` 接收一个包含多个 Promise 的数组作为参数，返回一个新的 Promise。该 Promise 将会在数组中所有 Promise 状态均为 `fulfilled` 时被解决，并且以数组形式返回所有 Promise 的结果。

如果数组中有任何一个 Promise 被拒绝，则返回的 Promise 将会以最先被拒绝的 Promise 的原因作为其原因拒绝。

3. `Promise.allSettled()`

`Promise.allSettled()` 接收一个包含多个 Promise 的数组作为参数，返回一个新的 Promise。该 Promise 将会在数组中所有 Promise 状态都被解决时被解决，并且以数组形式返回所有 Promise 的结果。和 `Promise.all()` 不同，`Promise.allSettled()` 不会在有 Promise 被拒绝时拒绝该 Promise。

返回的 Promise 的数组中的每个元素都是一个对象，该对象表示原始 Promise 的结果。每个对象都有一个 `status` 属性，表示原始 Promise 的状态，其值为字符串 `'fulfilled'` 或 `'rejected'`。如果 Promise 被解决，对象还会包含一个 `value` 属性，表示 Promise 的解决值。如果 Promise 被拒绝，对象还会包含一个 `reason` 属性，表示 Promise 的拒绝原因。

综上所述，`Promise.race()`、`Promise.all()` 和 `Promise.allSettled()` 的主要区别在于它们对多个 Promise 的状态处理方式不同，以及返回的 Promise 所包含的数据类型和结构不同。

## Comments / Answers

---

**yanlele** at 2023-03-15T13:43:44Z

可以参考这个文档
https://juejin.cn/post/6844903912592375821

