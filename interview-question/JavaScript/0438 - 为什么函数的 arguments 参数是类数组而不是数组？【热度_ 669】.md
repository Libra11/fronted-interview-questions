# 为什么函数的 arguments 参数是类数组而不是数组？【热度: 669】

- Issue: #438
- State: open
- Labels: JavaScript, 腾讯
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/438
- Created: 2023-06-08T15:42:57Z
- Updated: 2025-02-21T15:34:45Z

## Body

**关键词**：arguments 参数、arguments 参数遍历

在 JavaScript 中，函数的 `arguments` 参数被设计为类数组对象，而不是真正的数组。这是因为 `arguments` 对象包含了函数调用时传入的所有参数，包括未命名的参数。它提供了一种方便的方式来访问和操作这些参数。

要遍历类数组对象，可以使用以下方法：

1. 使用 for 循环和索引：通过使用普通的 for 循环和索引来遍历类数组对象。
```javascript
function sum() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

sum(1, 2, 3);  // 输出：1 2 3
```

2. 使用 for...of 循环：`arguments` 是特殊的类数组， 因为他实现了`[Symbol.iterator]`迭代器， 故可以使用 for...of 循环
```javascript
function sum() {
  for (let arg of arguments) {
    console.log(arg);
  }
}

sum(1, 2, 3);  // 输出：1 2 3
```

3. 将类数组对象转换为真正的数组后遍历：可以使用上述提到的类数组转换方法将类数组对象转换为真正的数组，然后使用数组的遍历方法进行遍历，如 `forEach()`、`map()` 等。
```javascript
function sum() {
  const args = Array.from(arguments);
  args.forEach(arg => {
    console.log(arg);
  });
}

sum(1, 2, 3);  // 输出：1 2 3
```

这些方法都可以用于遍历类数组对象，根据需求选择适合的方式进行操作。


## Comments / Answers

---

**wuhuaizai** at 2023-09-07T08:58:50Z

for...of遍历需要对象有[Symbol.iterator]迭代器吧，类数组的定义中没有要求对象上有这个属性

---

**yanlele** at 2023-09-07T09:58:34Z

> for...of遍历需要对象有[Symbol.iterator]迭代器吧，类数组的定义中没有要求对象上有这个属性

@wuhuaizai 
它确实是一个类数组， 有 length， 没有 push、pop 等方法， 但是唯独有实现[Symbol.iterator]迭代器

![image](https://github.com/pro-collection/interview-question/assets/22188674/4a89d066-e2e4-4b73-a2d8-24a58d5fa1e0)


---

**wuhuaizai** at 2023-09-07T10:08:57Z

> > for...of遍历需要对象有[Symbol.iterator]迭代器吧，类数组的定义中没有要求对象上有这个属性
> 
> @wuhuaizai 它确实是一个类数组， 有 length， 没有 push、pop 等方法， 但是唯独有实现[Symbol.iterator]迭代器
> 
> ![image](https://user-images.githubusercontent.com/22188674/266277890-4a89d066-e2e4-4b73-a2d8-24a58d5fa1e0.png)
从 ES6 开始，可以使用 for...of 循环来遍历可迭代对象，包括类数组对象

这句话不合适，arguments是可迭代对象同时也是类数组，但不是所有类数组对象都是可迭代对象，所以for...of不能用来遍历普通的类数组


---

**yanlele** at 2023-09-07T11:11:20Z


@wuhuaizai 说的非常的有道理， 确实表达不合适， 已经换了描述了；
感谢认真阅读的同学，且认真的反馈问题；
![image](https://github.com/pro-collection/interview-question/assets/22188674/7f65d831-b139-4076-a6ff-28b08933f98a)


---

**BruceYuj** at 2025-02-21T15:34:42Z

答案和题目不太符合。全文主要讲了怎么用 `arguments`? 并没有提为什么如此设计。
简单答疑下：
1. 没有必要设计成数组：arguments 在设计之初，需要保持足够的**轻量级**。因此 `push`、`pop` 之类的方法对于 arguments 是无必要的
2. 在某种程度上能够减少内存占用和性能消耗。因为够“轻”。
