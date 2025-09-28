# 如何检测对象是否循环引用？

## 检测循环引用

例如下面的场景， 已经出现循环引用了， 如何检测？ 
```js
const foo = {
  foo: "Foo",
  bar: {
    bar: "Bar",
  },
};

foo.bar.baz = foo; // 循环引用！
```

解答：使用 WeakSet 特性解决；
```js
// 对 传入的 subject 对象 内部存储的所有内容执行回调
function execRecursively(fn, subject, _refs = new WeakSet()) {
  // 避免无限递归
  if (_refs.has(subject)) {
    return;
  }

  fn(subject);
  if (typeof subject === "object") {
    _refs.add(subject);
    for (const key in subject) {
      execRecursively(fn, subject[key], _refs);
    }
  }
}

const foo = {
  foo: "Foo",
  bar: {
    bar: "Bar",
  },
};

foo.bar.baz = foo; // 循环引用！
execRecursively((obj) => console.log(obj), foo);
```

参考：[#35 ](https://github.com/yanlele/interview-question/issues/35)

## Comments / Answers

---

**Guan-Erjia** at 2025-05-31T06:36:33Z

JSON.stringify 如果报错就是循环引用

---

**canvascat** at 2025-05-31T13:47:13Z

> JSON.stringify 如果报错就是循环引用

```js
const greet = () => 'hi'
greet.greet = greet  // 循环引用！

JSON.stringify(greet) // 不会报错
```