# ts 中 type 和 interface的区别

- Issue: #273
- State: open
- Labels: TypeScript, 腾讯
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/273
- Created: 2023-04-09T07:29:21Z
- Updated: 2023-08-06T07:44:59Z

## Body

### 相同点

1. 都可以描述一个对象或者函数

- interface

```typescript
interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}
```

- ts

```typescript
type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number) => void;
```

2. 都允许拓展（extends） interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。

### 差异点

- **type**
    - type 可以声明基本类型别名，联合类型，元组等类型
    - type 语句中还可以使用 typeof 获取实例的 类型进行赋值
    - 其他骚操作

```typescript
type StringOrNumber = string | number;
type Text = string | { text: string };
type NameLookup = Dictionary<string, Person>;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

- **interface**
    - interface 能够声明合并
```typescript
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。



## Comments / Answers

---

**yanlele** at 2023-08-06T07:44:59Z

补充：

interface 和 type 两个关键字因为其功能比较接近，常常引起新手的疑问：应该在什么时候用type，什么时候用interface？ interface 的特点如下： :::info

* 同名interface自动聚合，也可以和已有的同名class聚合，适合做polyfill
* 自身只能表示object/class/function的类型 ::: 建议**库的开发者所提供的公共api应该尽量用interface/class**，方便使用者自行扩展。举个例子，monaco缺失了一些需要的API，所以需要手动polyfill一下。

```typescript
/**
 * Cloud Studio使用的monaco版本较老0.14.3，和官方文档相比缺失部分功能
 * 另外vscode有一些特有的功能，必须适配
 * 故在这里手动实现作为补充
 */
declare module monaco {
  interface Position {
    delta(deltaLineNumber?: number, deltaColumn?: number): Position
  }
}

// monaco 0.15.5
monaco.Position.prototype.delta = function (this: monaco.Position, deltaLineNumber = 0, deltaColumn = 0) {
  return new monaco.Position(this.lineNumber + deltaLineNumber, this.column + deltaColumn);
}

```

与interface相比，type的特点如下： :::info

* 表达功能更强大，不局限于object/class/function
* 要扩展已有type需要创建新type，不可以重名
* 支持更复杂的类型操作 ::: 基本上所有用interface表达的类型都有其等价的type表达。但在实践的过程中，也发现了一种类型只能用interface表达，无法用type表达，那就是往函数上挂载属性。

```typescript
interface FuncWithAttachment {
    (param: string): boolean;
    someProperty: number;
}

const testFunc: FuncWithAttachment = ...;
const result = testFunc('mike');    // 有类型提醒
testFunc.someProperty = 3;    // 有类型提醒

```

from [《TypeScript中高级应用与最佳实践》](https://juejin.cn/post/6844903904140853255 "https://juejin.cn/post/6844903904140853255")

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fd55c79091a435792ce71d120aca641~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
