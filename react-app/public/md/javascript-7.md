# es6 数据结构 Set 了解多少？

## Set 

### 基本概念
Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

Set对象是值的集合，你可以按照插入的顺序迭代它的元素。Set 中的元素只会出现一次，即 Set 中的元素是唯一的。

另外，NaN 和 undefined 都可以被存储在 Set 中，NaN 之间被视为相同的值（NaN 被认为是相同的，尽管 NaN !== NaN）。

### 有哪些属性和方法
操作方法：               
`add(value)`：添加某个值，返回 Set 结构本身。                   
`delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。                       
`has(value)`：返回一个布尔值，表示该值是否为Set的成员。                   
`clear()`：清除所有成员，没有返回值。

遍历方法：                       
`keys()`：返回键名的遍历器                     
`values()`：返回键值的遍历器                   
`entries()`：返回键值对的遍历器                     
`forEach()`：使用回调函数遍历每个成员
`Set.prototype[@@iterator]()`： 返回一个新的迭代器对象，该对象包含 Set 对象中的按插入顺序排列的所有元素的值。

**`Set.prototype[@@iterator]()`** 较为特殊， 细说一下：
@@iterator 属性的初始值和 values 属性的初始值是同一个函数。
```js
const mySet = new Set();
mySet.add('0');
mySet.add(1);
mySet.add({});

const setIter = mySet[Symbol.iterator]();

console.log(setIter.next().value); // "0"
console.log(setIter.next().value); // 1
console.log(setIter.next().value); // Object
```

### 一些实用场景
```js
// 判断是会否属于： B 是否属于 A
function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}

// 合集
function union(setA, setB) {
    let _union = new Set(setA);
    for (let elem of setB) {
        _union.add(elem);
    }
    return _union;
}

// 交集
function intersection(setA, setB) {
    let _intersection = new Set();
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

// 对称差分
function symmetricDifference(setA, setB) {
    let _difference = new Set(setA);
    for (let elem of setB) {
        if (_difference.has(elem)) {
            _difference.delete(elem);
        } else {
            _difference.add(elem);
        }
    }
    return _difference;
}

// 属于 A 但是不属于 B
function difference(setA, setB) {
    let _difference = new Set(setA);
    for (let elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}

//Examples
let setA = new Set([1, 2, 3, 4]),
    setB = new Set([2, 3]),
    setC = new Set([3, 4, 5, 6]);

isSuperset(setA, setB);          // => true
union(setA, setC);               // => Set [1, 2, 3, 4, 5, 6]
intersection(setA, setC);        // => Set [3, 4]
symmetricDifference(setA, setC); // => Set [1, 2, 5, 6]
difference(setA, setC);          // => Set [1, 2]
```


## WeakSet 
### 基本概念
WeakSet 对象允许你将弱保持对象存储在一个集合中。

WeakSet 对象是一些对象值的集合。且其与 Set 类似，WeakSet 中的每个对象值都只能出现一次。在 WeakSet 的集合中，所有对象都是唯一的。

它和 Set 对象的主要区别有：

- WeakSet 只能是对象的集合，而不能像 Set 那样，可以是任何类型的任意值。
- WeakSet 持弱引用：集合中对象的引用为弱引用。如果没有其它的对 WeakSet 中对象的引用，那么这些对象会被当成垃圾回收掉。

这也意味着 WeakSet 中没有存储当前对象的列表。正因为这样，**WeakSet 是不可枚举的**。


## 实例方法

- WeakSet.prototype.add(value): 将 value 添加到 WeakSet 对象最后一个元素的后面。

- WeakSet.prototype.delete(value): 从 WeakSet 中移除 value。此后调用 WeakSet.prototype.has(value) 将返回 false。

- WeakSet.prototype.has(value): 返回一个布尔值，表示 value 是否存在于 WeakSet 对象中。


### 使用场景 - 检测循环引用
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


------------------------
> 补充：2023.09.16

下面是 JavaScript Set 数据结构的常用 API：

| API                    | 描述                                             |
| ---------------------- | ------------------------------------------------ |
| `Set.prototype.add()`  | 向 Set 中添加一个新的元素                         |
| `Set.prototype.delete()`  | 从 Set 中删除一个元素                             |
| `Set.prototype.has()`  | 判断 Set 中是否存在某个元素                       |
| `Set.prototype.clear()` | 清空 Set 中的所有元素                             |
| `Set.prototype.size`   | 返回 Set 中的元素个数                             |
| `Set.prototype.keys()`  | 返回一个包含 Set 中所有键的迭代器                 |
| `Set.prototype.values()`  | 返回一个包含 Set 中所有值的迭代器                 |
| `Set.prototype.entries()` | 返回一个包含 Set 中所有键值对的迭代器             |
| `Set.prototype.forEach()` | 对 Set 中的每个元素执行指定的操作                 |

以上是 Set 数据结构的常用 API，可以通过这些 API 对 Set 进行添加、删除、查询、遍历等操作。