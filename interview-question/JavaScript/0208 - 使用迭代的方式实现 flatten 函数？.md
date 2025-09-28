# 使用迭代的方式实现 flatten 函数？

- Issue: #208
- State: open
- Labels: JavaScript, 百度
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/208
- Created: 2023-03-27T15:03:15Z
- Updated: 2023-03-27T15:03:48Z

## Body

可以使用迭代的方式实现 `flatten` 函数，具体思路如下：

1. 创建一个新数组 `result` 来存放结果。
2. 创建一个栈 `stack`，将原数组作为第一个元素压入栈中。
3. 当栈不为空时，取出栈顶元素，如果该元素是一个数组，则将其展开后的每个元素压入栈中。
4. 如果该元素不是一个数组，则将其加入到 `result` 中。
5. 重复步骤 3 和 4，直到栈为空。

下面是代码实现：

```javascript
function flatten(array) {
  const result = [];
  const stack = [array];

  while (stack.length > 0) {
    const item = stack.pop();

    if (Array.isArray(item)) {
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push(item[i]);
      }
    } else {
      result.push(item);
    }
  }

  return result.reverse();
}
```

这里使用了一个技巧，就是在将数组元素压入栈中时，从数组的末尾开始遍历，这样就可以保证压入栈中的顺序和展开后的顺序是一致的，最后再将结果翻转一下即可。
