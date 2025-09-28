# JavaScript 有几种方法判断变量的类型（类型检测）？

### JavaScript 中有以下几种方法可以判断变量的类型

- typeof 运算符：可以用于判断基本数据类型（如字符串、数字、布尔值、Undefined 等）和函数类型，但对于对象类型（如数组、日期、正则表达式等）不能准确判断。

- instanceof 运算符：可以用于判断一个对象是否为某个构造函数的实例，但不能判断基本数据类型。

- Object.prototype.toString() 方法：可以返回一个对象的具体类型字符串，可以判断所有数据类型，但需要注意的是需要使用 call 或 apply 方法将要判断的对象传递给 toString 方法。

- Array.isArray() 方法：可以判断一个对象是否为数组类型。

- constructor 属性：可以返回一个对象的构造函数，但需要注意的是 constructor 属性可以被修改，因此不能保证准确性。


### 举例 Object.prototype.toString() 是如何判断js 类型的
Object.prototype.toString() 方法是用来返回当前对象的类型字符串，其实现方式是返回一个类似 "[object Type]" 的字符串，其中 Type 是当前对象的类型。

```js
Object.prototype.toString.call("hello") // "[object String]"
Object.prototype.toString.call(123) // "[object Number]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"

var arr = [1, 2, 3];
Object.prototype.toString.call(arr) // "[object Array]"

var date = new Date();
Object.prototype.toString.call(date) // "[object Date]"

var reg = /abc/;
Object.prototype.toString.call(reg) // "[object RegExp]"

var func = function() {};
Object.prototype.toString.call(func) // "[object Function]"
```

通过这种方式，可以精确判断变量的类型，包括基本数据类型和对象类型。




## Comments / Answers

---

**yanlele** at 2024-01-14T09:54:53Z

补充一下： instanceof 是如何判定类型的

```js
const number = 42;  
number instanceof Number // false  
  
const numberObj = new Number(42);  
numberObj instanceof Number // true  
  
const string = "Hello, world!";  
string instanceof String // false  
  
const stringObj = new String("Hello, world!");  
stringObj instanceof String // true  
  
const bool = true;  
bool instanceof Boolean // false  
  
const boolObj = new Boolean(true);  
boolObj instanceof Boolean // true  
```