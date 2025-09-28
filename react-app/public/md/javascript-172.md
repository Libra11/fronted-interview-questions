# es6 class 装饰器是如何实现的？

ES6 中的装饰器是一种特殊的语法，用于动态修改类的行为。在 JavaScript 中，装饰器本质上是一个函数，它可以接受一个类作为参数，并返回一个新的类，实现了类的增强或修改。装饰器可以被用于类、方法、属性等各种地方，可以方便地实现类似 AOP、元编程等功能。

装饰器是 ES7 中的一个提案，目前还没有正式纳入标准。在 ES6 中使用装饰器需要借助第三方库，如 babel-plugin-transform-decorators-legacy。

装饰器实现的基本原理是，在装饰器函数和被装饰对象之间建立一个代理层，通过代理层来实现装饰器的逻辑。在类的装饰器中，装饰器函数的第一个参数是被装饰的类本身，装饰器函数内部可以访问、修改该类的属性和方法。在方法和属性的装饰器中，装饰器函数的第一个参数分别是被装饰的方法或属性所在的类的原型对象，装饰器函数内部可以访问、修改该方法或属性的属性描述符等信息。

以下是一个简单的装饰器示例，用于给类的方法添加一个计时器：

```javascript
function timer(target, name, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    console.time(name);
    const result = originalMethod.apply(this, args);
    console.timeEnd(name);
    return result;
  };
  return descriptor;
}

class MyClass {
  @timer
  myMethod() {
    // do something
  }
}
```

在上面的示例中，timer 函数就是一个装饰器函数，它接受三个参数，分别是被装饰的方法所在类的原型对象、被装饰的方法的名称、被装饰的方法的属性描述符。在 timer 函数内部，将被装饰的方法替换为一个新的方法，新方法先执行 console.time() 方法，再执行原始方法，最后执行 console.timeEnd() 方法。最后将新的属性描述符返回，完成方法的装饰。

通过类似这种方式，我们可以方便地实现各种类型的装饰器，以增强或修改类的行为。