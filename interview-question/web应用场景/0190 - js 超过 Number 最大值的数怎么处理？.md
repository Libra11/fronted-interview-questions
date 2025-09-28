# js 超过 Number 最大值的数怎么处理？

- Issue: #190
- State: open
- Labels: web应用场景
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/190
- Created: 2023-03-26T09:39:36Z
- Updated: 2023-03-26T09:39:37Z

## Body

### js 超过 Number 最大值的数怎么处理

在 JavaScript 中，超过 `Number.MAX_VALUE` 的数值被认为是 `Infinity`（正无穷大）。如果要处理超过 `Number.MAX_VALUE` 的数值，可以使用第三方的 JavaScript 库，如 `big.js` 或 `bignumber.js`，这些库可以处理任意精度的数值。

例如，使用 `big.js` 库可以将两个超过 `Number.MAX_VALUE` 的数相加：

```javascript
const big = require('big.js');

const x = new big('9007199254740993');
const y = new big('100000000000000000');

const result = x.plus(y);

console.log(result.toString()); // 输出：100009007194925474093
```

这里创建了两个 `big.js` 对象 `x` 和 `y`，分别存储超过 `Number.MAX_VALUE` 的数值。通过 `plus` 方法将它们相加，得到了正确的结果。最后，通过 `toString` 方法将结果转换为字符串。

### 如果不依赖外部库，咋处理

JavaScript 中，数值超过了 Number 最大值时，可以使用 BigInt 类型来处理，它可以表示任意精度的整数。

使用 BigInt 类型时，需要在数值后面添加一个 `n` 后缀来表示 BigInt 类型。例如：

```javascript
const bigNum = 9007199254740993n; // 注意：数字后面添加了 'n' 后缀
```

注意，BigInt 类型是 ECMAScript 2020 新增的特性，因此在某些浏览器中可能不被支持。如果需要在不支持 BigInt 的环境中使用 BigInt，可以使用 polyfill 或者第三方库来实现。
