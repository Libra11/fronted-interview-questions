# call、apply、bind 的区别和用法？

- Issue: #9
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/9
- Created: 2023-03-06T15:19:39Z
- Updated: 2023-03-06T15:19:40Z

## Body

call、apply 和 bind 都是 JavaScript 中用于改变函数执行上下文（即 this 指向）的方法，它们的区别和用法如下：

## call
call 方法可以改变函数的 this 指向，同时还能传递多个参数。
**call 方法的语法如下：**
```js
fun.call(thisArg, arg1, arg2, ...)
```
fun：要调用的函数。
thisArg：函数内部 this 指向的对象。
arg1, arg2, ...：传递给函数的参数列表。


**call 方法的使用示例：**
```js
const person = {
  name: 'Alice',
  sayHello: function () {
    console.log(`Hello, ${this.name}!`)
  },
}

const person2 = {
  name: 'Bob',
}

person.sayHello.call(person2) // 输出：Hello, Bob!
```

## apply
apply 方法和 call 方法类似，它也可以改变函数的 this 指向，但是它需要传递一个数组作为参数列表。
**apply 方法的语法如下：**
```js
fun.apply(thisArg, [argsArray])
```
fun：要调用的函数。
thisArg：函数内部 this 指向的对象。
argsArray：传递给函数的参数列表，以数组形式传递。

**apply 方法的使用示例：**
```js
const person = {
  name: 'Alice',
  sayHello: function (greeting) {
    console.log(`${greeting}, ${this.name}!`)
  },
}

const person2 = {
  name: 'Bob',
}

person.sayHello.apply(person2, ['Hi']) // 输出：Hi, Bob!
```

## bind
bind 方法和 call、apply 方法不同，它并不会立即调用函数，而是返回一个新的函数，这个新函数的 this 指向被绑定的对象。
**bind 方法的语法如下：**

```js
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```
fun：要调用的函数。
thisArg：函数内部 this 指向的对象。
arg1, arg2, ...：在调用函数时，绑定到函数参数的值。

**bind 方法的使用示例：**
```js
const person = {
  name: 'Alice',
  sayHello: function () {
    console.log(`Hello, ${this.name}!`)
  },
}

const person2 = {
  name: 'Bob',
}

const sayHelloToBob = person.sayHello.bind(person2)
sayHelloToBob() // 输出：Hello, Bob!
```

**参数传递**
在使用 bind 方法时，我们可以通过传递参数来预先填充函数的一些参数，这样在调用函数时只需要传递剩余的参数即可。
```js
const person = {
  name: 'Alice',
  sayHello: function (greeting, punctuation) {
    console.log(`${greeting}, ${this.name}, ${punctuation}`)
  },
}

const person2 = {
  name: 'Bob',
}

const sayHelloToBob = person.sayHello.bind(person2);

sayHelloToBob(1,2); // 输出：1, Bob, 2
```

**再举一个例子：**
```js
this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

