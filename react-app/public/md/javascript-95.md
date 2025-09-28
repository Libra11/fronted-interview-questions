# 实现：setObjectValue(obj: object, keys: string[], value: any) 方法， 支持安全设置对象的值

可以使用递归实现安全设置对象的值。以下是一个实现setObjectValue方法的例子：

```typescript
typescriptCopy codefunction setObjectValue(obj: object, keys: string[], value: any) {
  const key = keys.shift();
  if (!key) {
    return;
  }

  if (keys.length === 0) {
    obj[key] = value;
    return;
  }

  if (!obj[key]) {
    obj[key] = {};
  }

  setObjectValue(obj[key], keys, value);
}
```

这个方法接受三个参数：要设置值的对象，一个字符串数组表示对象的键的路径，和要设置的值。例如，如果要设置对象`user`的`address`字段的`city`属性为`"New York"`，可以调用方法：

```typescript
typescriptCopy codeconst user = {};
setObjectValue(user, ['address', 'city'], 'New York');
```

在这个例子中，`keys`数组的第一个元素是`"address"`，所以我们检查`user`对象是否有一个名为`"address"`的属性。如果没有，我们创建一个新对象并将其分配给`user.address`属性。然后我们继续递归地调用`setObjectValue`方法，将新对象作为第一个参数传递，将`keys`数组的剩余部分作为第二个参数传递，将最终的值作为第三个参数传递。最终，我们将`"New York"`分配给`user.address.city`属性。

这个方法确保在设置对象值时不会引发`TypeError`异常，即使对象的某些部分尚未定义。