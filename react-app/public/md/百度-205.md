# 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

用 `const` 或 `let` 声明的变量不会挂在在 `window` 对象上，而是在一个称为块级作用域（block scope）的作用域内。这个作用域可以是一个函数、一个代码块（比如 `{}` 之间的语句），或者全局作用域。

在块级作用域中声明的变量无法通过 `window` 对象访问，只能在当前作用域内访问。如果要在全局作用域中访问这个变量，需要显式地将它添加到 `window` 对象上。

以下是一个例子：

```javascript
{
  const foo = 'bar';
  let baz = 'qux';
  var quux = 'corge';
}

console.log(window.foo); // undefined
console.log(window.baz); // undefined
console.log(window.quux); // 'corge'
```

在上面的例子中，`foo` 和 `baz` 声明在一个代码块内，因此它们不会挂在在 `window` 对象上。而 `quux` 声明使用了 `var`，因此它会被挂在在 `window` 对象上。

如果我们希望在全局作用域中访问 `foo` 和 `baz`，可以将它们手动添加到 `window` 对象上：

```javascript
{
  const foo = 'bar';
  let baz = 'qux';
  var quux = 'corge';

  window.foo = foo;
  window.baz = baz;
}

console.log(window.foo); // 'bar'
console.log(window.baz); // 'qux'
console.log(window.quux); // 'corge'
```

但是，在实际编程中，最好尽量避免将变量挂在在 `window` 对象上，以避免命名冲突和污染全局命名空间。