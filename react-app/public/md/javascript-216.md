# 实现 (5).add(3).minus(2) 功能

可以通过在 Number 原型上定义 add 和 minus 方法来实现该功能，代码如下：

```javascript
Number.prototype.add = function(num) {
  return this + num;
};

Number.prototype.minus = function(num) {
  return this - num;
};

console.log((5).add(3).minus(2)); // 输出6
```

上述代码中，通过在 Number.prototype 上定义 add 和 minus 方法，实现了将数字类型的值转换为 Number 对象，并且可以链式调用这两个方法。最终返回的结果是一个数值类型的值。