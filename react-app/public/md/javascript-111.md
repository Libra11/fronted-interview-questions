# null 和 undefined 的区别，如何让一个属性变为 null？

`null`和`undefined`都是JavaScript中表示缺失或无值的特殊值。

`undefined`是一个变量没有被赋值时的默认值，或者在访问对象属性或数组元素不存在时返回的值。例如：

```javascript
let a;
console.log(a); // 输出 undefined

const obj = {};
console.log(obj.nonexistentProp); // 输出 undefined
```

而`null`表示一个变量被明确地赋值为没有值。例如：

```javascript
const a = null;
console.log(a); // 输出 null
```

要将一个属性的值设置为`null`，可以像这样：

```javascript
const obj = { prop: 'value' };
obj.prop = null;
console.log(obj.prop); // 输出 null
```

如果要删除对象的属性并将其值设置为`null`，可以使用`delete`操作符：

```javascript
const obj = { prop: 'value' };
delete obj.prop;
obj.prop = null;
console.log(obj.prop); // 输出 null
```

请注意，尝试访问一个已删除的属性将返回`undefined`而不是`null`。