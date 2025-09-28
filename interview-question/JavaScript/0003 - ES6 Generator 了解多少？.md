# ES6 Generator 了解多少？

- Issue: #3
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/3
- Created: 2023-03-06T15:19:21Z
- Updated: 2023-03-06T15:19:22Z

## Body

## Generator 基本概念

ES6中的 Generator（生成器）是一种特殊类型的函数，它可以被暂停和恢复。这意味着在调用Generator函数时，它不会立即执行，而是返回一个可暂停执行的Generator对象。在需要的时候，可以通过调用.next()方法来恢复函数的执行。这使得我们能够编写更具表现力和灵活性的代码。

Generator函数使用特殊的语法：在函数关键字后面添加一个星号(*)。Generator函数中可以使用一个新的关键字yield，用于将函数的执行暂停，并且可以将一个值返回给调用者。

以下是一个简单的 Generator 函数的例子：

```js
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
```
在上面的例子中，generateSequence()是一个Generator函数，它定义了一个简单的数列生成器。在函数中，使用了yield关键字，以便能够暂停函数执行。最后，我们通过调用generator.next()方法来恢复函数的执行，并逐步返回生成器中的每一个值。


Generator函数也可以接收参数，并且可以在每次迭代时使用不同的参数值。这使得它们能够以更灵活的方式生成数据。

以下是一个带参数的Generator函数的例子：
```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

let generator = generateSequence(1, 5);

console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
console.log(generator.next().value); // 4
console.log(generator.next().value); // 5
```

Generator是一种非常有用的工具，它能够帮助我们编写更灵活和表达力强的代码。它们在异步编程、迭代器和生成器等场景中得到了广泛的应用。


## 与 async/await 有啥关系？
Generator 和 async/await 都是 ES6 中引入的异步编程解决方案，它们本质上都是利用了 JavaScript 中的协程（coroutine）。

Generator 和 async/await 都是 JavaScript 中用于异步编程的方式，它们的本质相同，都是利用了生成器函数的特性来实现异步操作。

在 ES5 中，JavaScript 使用回调函数实现异步编程，但是这样会导致回调嵌套过深，代码可读性差、难以维护。Generator 和 async/await 的出现解决了这个问题，它们让异步编程更加像同步编程，使代码可读性和可维护性得到了大幅提升。

**Generator 可以使用 yield 语句来暂停函数执行，并返回一个 Generator 对象，通过这个对象可以控制函数的继续执行和结束。而 async/await 则是基于 Promise 实现的语法糖，可以使异步代码看起来像同步代码，代码结构更加清晰明了。**

在使用上，Generator 和 async/await 都需要通过一些特定的语法来实现异步操作，不同的是 async/await 通过 await 关键字等待 Promise 对象的解决，而 Generator 则是通过 yield 关键字暂停函数执行，并返回一个 Generator 对象，通过 next 方法控制函数的继续执行和结束。另外，async/await 可以更好地处理 Promise 的错误，而 Generator 需要使用 try/catch 语句来捕获错误。

Generator 和 async/await 可以互相转换，这意味着我们可以使用 Generator 来实现 async/await 的功能，也可以使用 async/await 来调用 Generator 函数。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

async function test() {
  for await (const x of gen()) {
    console.log(x);
  }
}

test(); // 输出 1, 2, 3
```

在上面的代码中，`for await...of` 循环语句可以遍历 `Generator` 函数生成的迭代器，从而实现异步迭代。注意在调用 for await...of 时需要使用 yield* 关键字来进行委托。


Generator 函数使用 await 调用示例：
```js
function* generator() {
  const result1 = yield asyncTask1();
  const result2 = yield asyncTask2(result1);
  return result2;
}

async function runGenerator() {
  const gen = generator();
  const result1 = await gen.next().value;
  const result2 = await gen.next(result1).value;
  const finalResult = await gen.next(result2).value;
  console.log(finalResult);
}

runGenerator();
```


