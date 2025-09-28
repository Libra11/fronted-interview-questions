# 0.1 + 0.2 不等于 0.3 这是什么原因，要怎么解决【热度: 389】

**关键词**：精度计算

在 JavaScript 中，`0.1 + 0.2` 不等于 `0.3` 的原因是浮点数的精度问题。

在计算机中，浮点数采用二进制存储，而有些十进制小数无法精确地用二进制表示。`0.1` 和 `0.2` 在二进制表示中是无限循环的，在进行运算时会产生舍入误差。

要解决这个问题，可以使用以下方法：

1. 使用 `Number.EPSILON` 来比较两个浮点数是否接近：

```javascript
function numbersAreCloseEnough(num1, num2) {
  return Math.abs(num1 - num2) < Number.EPSILON;
}

let result = 0.1 + 0.2;
console.log(numbersAreCloseEnough(result, 0.3));
```

2. 将浮点数乘以一个适当的倍数转换为整数进行计算，计算完成后再除以这个倍数转换回浮点数：

```javascript
let num1 = 0.1 * 10;
let num2 = 0.2 * 10;
let sum = (num1 + num2) / 10;
console.log(sum === 0.3);
```

3. 使用第三方库，如 `decimal.js` ，它提供了更精确的十进制运算：

```javascript
const Decimal = require("decimal.js");

let num1 = new Decimal("0.1");
let num2 = new Decimal("0.2");
let sum = num1.plus(num2);
console.log(sum.eq(0.3));
```

这些方法可以帮助您在处理浮点数运算时更准确地得到预期的结果。


## Comments / Answers

---

**chang0022** at 2025-07-10T09:14:15Z

方法二不是完全正确的。问题的根源很清楚，那么浮点的加减乘除都会出现问题的。
```
const a = 64.99 * 100;
const b = 0.21 * 100;
const sum = (a + b) / 100;

console.log(sum === 65.2); // false
```

<img width="406" height="258" alt="Image" src="https://github.com/user-attachments/assets/fd6e6bdc-8464-4910-a667-0f2d11dfda4e" />

遇到浮点数的问题，用 `decimal.js` 或者 `bn.js` 库