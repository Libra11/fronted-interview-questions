# JS数据类型有哪些，区别是什么？

在 JavaScript 中，数据类型可以分为两类：**原始类型和对象类型**。原始类型包括：数字（number）、字符串（string）、布尔值（boolean）、null、undefined 和 Symbol（ES6 新增），对象类型包括：对象（object）、数组（array）、函数（function）等。

区别如下：

- 原始类型的值是不可变的，对象类型的值是可变的。
- 原始类型的值是按值访问的，对象类型的值是按引用访问的。 
- 原始类型存储在栈内存中，对象类型存储在堆内存中。


**原始类型**：
具体来说，**数字、字符串、布尔值、null 和 undefined 是 JavaScript 中的五种原始类型，它们都是不可变的**。每次对原始类型进行操作时，都会创建一个新的原始类型的值。例如：
```js
let num1 = 10;
let num2 = num1 + 5;
console.log(num1); // 10
console.log(num2); // 15
```

在上面的例子中，对 num1 进行操作时并没有改变 num1 的值，而是创建了一个新的值 num2。


**对象类型**：
对象类型则是可变的，因为对象、数组、函数等值是通过引用来访问的。例如：

```ts
let obj1 = { name: '张三' };
let obj2 = obj1;
obj2.name = '李四';
console.log(obj1.name); // "李四"
console.log(obj2.name); // "李四"
```
在上面的例子中，修改了 obj2 的属性值，但由于 obj1 和 obj2 指向的是同一个对象，所以 obj1 的属性值也被修改了。


**Symbol**：
除了五种原始类型和对象类型外，ES6 新增了一种原始类型：`Symbol`。它的主要作用是创建唯一的标识符。例如：
```js
let s1 = Symbol();
let s2 = Symbol();
console.log(s1 === s2); // false
```
在上面的例子中，两个 Symbol 创建的值是不相等的，即使它们的值是一样的。


------
> 作者 2024.08.17 补充

另外值得注意的是，ES6 还引入了一些新的对象类型或结构，例如 `Map`、`Set`、`WeakMap` 和 `WeakSet`，以及为了更好地处理异步操作引入的 Promise 和生成器对象。这些都属于扩展的 Object 类型，增强了 JavaScript 的功能性和异步编程能力。