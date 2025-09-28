# JS 里面是否会存在，对象上有一个 name 属性，但是原型链上还有一个同名的 name 属性【热度: 724】

- Issue: #1043
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/1043
- Created: 2024-10-29T23:50:32Z
- Updated: 2024-10-29T23:53:22Z

## Body

在 JavaScript 中是可能存在对象上有一个`name`属性，同时原型链上也有一个同名的`name`属性的情况。

以下是一个示例：

```javascript
function Person() {}
Person.prototype.name = 'prototype name';

const person = new Person();
person.name = 'instance name';

console.log(person.name); // 'instance name'
console.log(person.__proto__.name); // 'prototype name'
```

在这个例子中，首先定义了一个构造函数`Person`，在其原型上设置了一个`name`属性。然后创建一个`Person`的实例`person`，并在实例上也设置了一个同名的`name`属性。当访问`person.name`时，会优先访问实例上的属性，如果实例上没有该属性，才会沿着原型链向上查找。
