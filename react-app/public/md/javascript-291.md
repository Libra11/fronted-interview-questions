# promise 是否可以取消？

在原生的 JavaScript Promise 中，它没有内建的取消机制。一旦一个 Promise 被创建并开始执行，就无法直接取消它。

通常情况下，Promise 一旦被创建，就会一直执行直到成功(resolve)或失败(reject)。但是，你可以通过一些手动的方式来模拟取消 Promise 的效果。下面是几种常见的方法：

1. 忽略 Promise 的结果：当你不关心 Promise 的结果时，你可以选择忽略它。这意味着你不会处理 Promise 的 resolve 或 reject 回调函数，也不会将结果传递给其他地方。这样做相当于"取消"了对 Promise 结果的关注。

2. 基于标志位的取消机制：你可以创建一个标志位变量，并在 Promise 的执行过程中检查该变量。如果标志位被设置为取消状态，你可以选择终止 Promise 的执行，例如抛出一个特定的错误或执行一个不会产生影响的操作。

3. 使用第三方库：有一些第三方库，如`p-cancelable`和`cancelable-promise`，提供了可取消 Promise 的功能。这些库通过封装 Promise，提供了额外的方法来取消 Promise 的执行。

需要注意的是，虽然你可以使用上述方法来模拟取消 Promise 的效果，但它们并不是 Promise 的原生功能。在实际开发中，如果你需要取消异步操作，可能需要使用其他异步编程模型或使用支持取消操作的第三方库。


**以下是几个使用例子**，展示了如何通过不同的方式模拟取消 Promise 的效果：

1. 忽略 Promise 的结果：

```javascript
const promise = new Promise((resolve, reject) => {
  // 执行异步操作...
});

// 不处理 Promise 的结果
```

在上述示例中，我们创建了一个 Promise，但没有处理它的 resolve 或 reject 回调函数。这意味着我们不关心 Promise 的结果，相当于忽略了它。

2. 基于标志位的取消机制：

```javascript
let canceled = false;

const promise = new Promise((resolve, reject) => {
  // 执行异步操作...
  if (canceled) {
    reject(new Error('Promise canceled'));
  } else {
    // 继续正常处理
  }
});

// 在需要取消 Promise 的时候，将 canceled 标志位设置为 true
canceled = true;
```

在上述示例中，我们创建了一个标志位变量`canceled`，并在 Promise 的执行过程中检查该变量。如果`canceled`被设置为`true`，我们选择拒绝 Promise，并传递一个特定的错误作为原因，表示 Promise 被取消。

3. 使用第三方库：

```javascript
import PCancelable from 'p-cancelable';

const promise = new PCancelable((resolve, reject, onCancel) => {
  // 执行异步操作...

  // 注册取消回调函数
  onCancel(() => {
    // 在取消时执行清理操作...
  });
});

// 取消 Promise
promise.cancel();
```

在上述示例中，我们使用第三方库`p-cancelable`，它提供了可取消 Promise 的功能。我们创建了一个`PCancelable`实例，并在 Promise 的执行过程中注册了一个取消回调函数。通过调用`promise.cancel()`方法，我们可以取消 Promise 的执行，并触发取消回调函数。

这些例子展示了如何通过不同的方式模拟取消 Promise 的效果。请注意，这些方法并不是 Promise 的原生功能，而是通过不同的实现方式来达到类似的效果。


## Comments / Answers

---

**diaoluodejc** at 2023-05-22T07:30:00Z

印错卷子了？

---

**yanlele** at 2023-05-23T14:45:30Z

> 印错卷子了？

@diaoluodejc 还真的是印错卷子了；感谢提醒