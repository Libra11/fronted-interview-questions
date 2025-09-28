# [3, 15, 8, 29, 102, 22].sort(), 结果是多少， 为什么？

输出结果为：
```js
[102, 15, 22, 29, 3, 8]
```

原因：
`Array.prototype.sort()` 

如果没有指明 compareFn ，那么元素会按照转换为的字符串的诸个字符的 Unicode 位点进行排序。例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFn），比较的数字会先被转换为字符串，所以在 Unicode 顺序上 "80" 要比 "9" 要靠前。

如果指明了 compareFn ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

如果 compareFn(a, b) 大于 0，b 会被排列到 a 之前。
如果 compareFn(a, b) 小于 0，那么 a 会被排列到 b 之前；
如果 compareFn(a, b) 等于 0，a 和 b 的相对位置不变。 备注：ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；

参考文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort