# 当使用 new 关键字创建对象时, 会经历哪些步骤？

在 JavaScript 中，`new` 关键字用于创建一个对象实例。当使用 `new` 关键字创建对象时，会发生以下几个步骤：

1. 创建一个空的对象。
2. 将这个空对象的 `[[Prototype]]` 属性设置为构造函数的 `prototype` 属性。
3. 将这个空对象赋值给构造函数内部的 `this` 关键字，用于初始化属性和方法。
4. 如果构造函数返回一个对象，那么返回这个对象；否则，返回第一步创建的对象实例。

以下是一个示例，演示如何使用 `new` 关键字创建一个对象实例：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person = new Person("John", 30);
console.log(person.name); // "John"
console.log(person.age); // 30
```

在上面的示例中，`new Person("John", 30)` 会创建一个新的对象实例。在构造函数 `Person` 中，`this.name` 和 `this.age` 会被赋值为 `"John"` 和 `30`。最终，`new` 关键字会返回这个新的对象实例。

需要注意的是，在 JavaScript 中，函数也是对象。因此，我们可以向对象一样定义属性和方法。当我们使用 `new` 关键字调用一个函数时，这个函数会被视为构造函数，从而创建一个新的对象实例。