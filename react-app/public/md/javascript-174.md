# Promise then 第二个参数和 Promise.catch 的区别是什么?

`Promise.then()` 方法可以接受两个参数，第一个参数是 `onFulfilled` 回调函数，第二个参数是 `onRejected` 回调函数。当 Promise 状态变为 `fulfilled` 时，将会调用 `onFulfilled` 回调函数；当 Promise 状态变为 `rejected` 时，将会调用 `onRejected` 回调函数。其中，第二个参数 `onRejected` 是可选的。

`Promise.catch()` 方法是一个特殊的 `Promise.then()` 方法，它只接受一个参数，即 `onRejected` 回调函数。如果 Promise 状态变为 `rejected`，则会调用 `onRejected` 回调函数；如果状态变为 `fulfilled`，则不会调用任何回调函数。因此，`Promise.catch()` 方法可以用来捕获 Promise 中的错误，相当于使用 `Promise.then(undefined, onRejected)`。

区别主要在于使用的方式不同。`Promise.then(onFulfilled, onRejected)` 可以同时传递两个回调函数，用来处理 Promise 状态变为 `fulfilled` 或者 `rejected` 的情况；而 `Promise.catch(onRejected)` 则只能用来处理 Promise 状态变为 `rejected` 的情况，并且使用更加简洁明了。