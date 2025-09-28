# js 对象可以使用 for...of 迭代吗？

- Issue: #22
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/22
- Created: 2023-03-06T15:20:20Z
- Updated: 2024-01-14T16:09:31Z

## Body

JavaScript **对象本身并不能直接使用 for...of 迭代**，因为它并不是一个可迭代对象（iterable）。

但是，如果我们想要遍历对象的属性，可以使用 for...in 循环，例如：
```js
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};

for (let prop in obj) {
  console.log(prop + ': ' + obj[prop]);
}

// 这段代码可以输出：
name: John
age: 30
city: New York
```

需要注意的是，for...in 循环会遍历对象自身的所有可枚举属性，包括非数字键和继承的属性。如果只想遍历对象自身的属性，可以使用 hasOwnProperty() 方法进行判断，例如：
```js
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};

for (let prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(prop + ': ' + obj[prop]);
  }
}
```

这段代码和上面的代码功能是一样的，但是多了一个 hasOwnProperty() 判断，可以确保只输出对象自身的属性。



