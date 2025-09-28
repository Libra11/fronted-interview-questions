# Javascript 数组中有那些方法可以改变自身，那些不可以

- Issue: #347
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/347
- Created: 2023-05-06T15:41:01Z
- Updated: 2023-06-02T06:36:31Z

## Body

可以改变自身的数组方法：

- `pop()`: 删除数组最后一项，并返回删除项的值。
- `push():` 向数组末尾添加一个或多个元素，并返回新数组的长度。
- `reverse()`: 反转数组的顺序，返回逆序后的原数组。
- `shift()`: 删除数组第一项，并返回删除项的值。
- `unshift()`: 方法将指定元素添加到数组的开头，并返回数组的新长度。
- `sort()`: 对数组进行排序，返回排序后的原数组。
- `splice()`: 添加或删除数组元素，返回由被删除元素组成的数组。

不可以改变自身的数组方法:

- `concat()`: 连接一或多个数组，返回新的合并的数组。
- `filter()`: 对数组筛选符合条件的项，并返回符合条件的项组成的新数组。
- `map()`: 对数组的每一项进行操作，并返回每个操作后的项组成的新数组。
- `slice()`: 返回数组的一部分作为新数组，原数组不会改变。
- `join()`: 将数组的每一项拼接起来作为一个字符串返回，原数组不会改变。


## Comments / Answers

---

**TaroSunn** at 2023-06-02T06:06:59Z

少了一个unshift吧

---

**yanlele** at 2023-06-02T06:36:31Z

> 少了一个unshift吧

@TaroSunn 已补充
