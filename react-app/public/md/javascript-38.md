# 手写实现一下 lodash.get？

lodash.get 是一个 JavaScript 库 Lodash 中的函数，它允许您在对象中安全地获取深层嵌套的属性值，即使在中间的属性不存在时也不会引发错误。以下是一个简单的实现：

```js
function get(object, path, defaultValue) {
  // 如果对象或路径不存在，则返回默认值
  if (!object || !path) {
    return defaultValue;
  }
  
  // 将路径拆分为一个数组，并过滤掉空值
  const pathArray = path.split('.').filter(Boolean);

  // 循环遍历路径数组，以获取嵌套属性值
  let value = object;
  for (let i = 0; i < pathArray.length; i++) {
    const key = pathArray[i];
    value = value[key];
    if (value === undefined) {
      return defaultValue;
    }
  }

  // 如果找到了属性值，则返回它，否则返回默认值
  return value || defaultValue;
}
```

使用示例：
```js
const object = {
  a: {
    b: {
      c: 'Hello World'
    }
  }
};

get(object, 'a.b.c'); // 返回 'Hello World'
get(object, 'a.b.d'); // 返回 undefined
get(object, 'a.b.d', 'default'); // 返回 'default'
```