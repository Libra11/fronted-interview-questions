# Proxy 和 Reflect 了解多少？

- Issue: #8
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/8
- Created: 2023-03-06T15:19:36Z
- Updated: 2023-03-06T15:19:37Z

## Body

## Proxy

### 基本概念
Proxy(代理) 是 ES6 中新增的一个特性。Proxy 让我们能够以简洁易懂的方式控制外部对对象的访问。其功能非常类似于设计模式中的代理模式。
使用 Proxy 的好处是：对象只需关注于核心逻辑，一些非核心的逻辑 （如：读取或设置对象的某些属性前记录日志；设置对象的某些属性值前，需要验证；某些属性的访问控制等）可以让 Proxy 来做。 从而达到关注点分离，降级对象复杂度的目的。

### api 有哪些？
`var p = new Proxy(target, handler);`                   
其中，target 为被代理对象。handler 是一个对象，其声明了代理 target 的一些操作。p 是代理后的对象。当外界每次对 p 进行操作时，就会执行 handler 对象上的一些方法。

handler 能代理的一些常用的方法如下：
- handler.getPrototypeOf(): Object.getPrototypeOf 方法的捕捉器。

- handler.setPrototypeOf(): Object.setPrototypeOf 方法的捕捉器。

- handler.isExtensible(): Object.isExtensible 方法的捕捉器。

- handler.preventExtensions(): Object.preventExtensions 方法的捕捉器。

- handler.getOwnPropertyDescriptor(): Object.getOwnPropertyDescriptor 方法的捕捉器。

- handler.defineProperty(): Object.defineProperty 方法的捕捉器。

- handler.has(): in 操作符的捕捉器。

- handler.get(): 属性读取操作的捕捉器。

- handler.set(): 属性设置操作的捕捉器。

- handler.deleteProperty(): delete 操作符的捕捉器。

- handler.ownKeys(): Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。

- handler.apply(): 函数调用操作的捕捉器。

- handler.construct(): new 操作符的捕捉器。
...
  
### 基础使用
```javascript
var target = {
   name: 'obj'
 };
 var logHandler = {
   get: function(target, key) {
     console.log(`${key} 被读取`);
     return target[key];
   },
   set: function(target, key, value) {
     console.log(`${key} 被设置为 ${value}`);
     target[key] = value;
   }
 };
var targetWithLog = new Proxy(target, logHandler);
targetWithLog.name;             // 控制台输出：name 被读取
targetWithLog.name = 'others';  // 控制台输出：name 被设置为 others
console.log(target.name);       // 控制台输出: others
```

### 使用示例 - 实现虚拟属性
```javascript
var person = {
  fisrsName: '张',
  lastName: '小白'
};
var proxyedPerson = new Proxy(person, {
  get: function (target, key) {
    if(key === 'fullName'){
      return [target.fisrsName, target.lastName].join(' ');
    }
    return target[key];
  },
  set: function (target, key, value) {
    if(key === 'fullName'){
      var fullNameInfo = value.split(' ');
      target.fisrsName = fullNameInfo[0];
      target.lastName = fullNameInfo[1];
    } else {
      target[key] = value;
    }
  }
});

console.log('姓:%s, 名:%s, 全名: %s', proxyedPerson.fisrsName, proxyedPerson.lastName, proxyedPerson.fullName);// 姓:张, 名:小白, 全名: 张 小白
proxyedPerson.fullName = '李 小露';
console.log('姓:%s, 名:%s, 全名: %s', proxyedPerson.fisrsName, proxyedPerson.lastName, proxyedPerson.fullName);// 姓:李, 名:小露, 全名: 李 小露
```

### 使用示例 - 实现私有变量
下面的 demo 实现了真正的私有变量。代理中把以 _ 开头的变量都认为是私有的。                   
```javascript
var api = {
  _secret: 'xxxx',
  _otherSec: 'bbb',
  ver: 'v0.0.1'
};

api = new Proxy(api, {
  get: function(target, key) {
    // 以 _ 下划线开头的都认为是 私有的
    if (key.startsWith('_')) {
      console.log('私有变量不能被访问');
      return false;
    }
    return target[key];
  },
  set: function(target, key, value) {
    if (key.startsWith('_')) {
      console.log('私有变量不能被修改');
      return false;
    }
    target[key] = value;
  },
  has: function(target, key) {
    return key.startsWith('_') ? false : (key in target);
  }
});

api._secret; // 私有变量不能被访问
console.log(api.ver); // v0.0.1
api._otherSec = 3; // 私有变量不能被修改
console.log('_secret' in api); //false
console.log('ver' in api); //true
```

### 使用示例 - 抽离校验模块
```javascript
function Animal() {
  return createValidator(this, animalValidator);
}
var animalValidator = {
  name: function(name) {
    // 动物的名字必须是字符串类型的
    return typeof name === 'string';
  }
};

function createValidator(target, validator) {
  return new Proxy(target, {
    set: function(target, key, value) {
      if (validator[key]) {
        // 符合验证条件
        if (validator[key](value)) {
          target[key] = value;
        } else {
          throw Error(`Cannot set ${key} to ${value}. Invalid.`);
        }
      } else {
        target[key] = value
      }
    }
  });
}

var dog = new Animal();
dog.name = 'dog';
console.log(dog.name);
dog.name = 123; // Uncaught Error: Cannot set name to 123. Invalid.
```

## Reflect

### 概念
Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。**这些方法与 `proxy handler` 的方法相同**。Reflect 不是一个函数对象，因此它是不可构造的。

与大多数全局对象不同 Reflect 并非一个构造函数，所以不能通过 new 运算符对其进行调用，或者将 Reflect 对象作为一个函数来调用。**Reflect 的所有属性和方法都是静态的**（就像 Math 对象）。

### api 有哪些？
- Reflect.apply(target, thisArgument, argumentsList): 对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 Function.prototype.apply() 功能类似。
    - 举例
    ```javascript
    const ages = [11, 33, 12, 54, 18, 96];
    
    // 旧写法
    const youngest = Math.min.apply(Math, ages);
    const oldest = Math.max.apply(Math, ages);
    const type = Object.prototype.toString.call(youngest);
    
    // 新写法
    const youngest = Reflect.apply(Math.min, Math, ages);
    const oldest = Reflect.apply(Math.max, Math, ages);
    const type = Reflect.apply(Object.prototype.toString, youngest, []);
    ```

- Reflect.construct(target, argumentsList[, newTarget]): 对构造函数进行 new 操作，相当于执行 new target(...args)。
    - Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
    ```javascript
    function Greeting(name) {
      this.name = name;
    }
    
    // new 的写法
    const instance = new Greeting('张三');
    
    // Reflect.construct 的写法
    const instance = Reflect.construct(Greeting, ['张三']);
    ```

- Reflect.defineProperty(target, propertyKey, attributes): 和 Object.defineProperty() 类似。如果设置成功就会返回 true

- Reflect.deleteProperty(target, propertyKey): 作为函数的delete操作符，相当于执行 delete target[name]。该方法返回一个布尔值。
    - Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象属性。
    ```javascript
    const myObj = { foo: 'bar' };
    
    // 旧写法
    delete myObj.foo;
    
    // 新写法
    Reflect.deleteProperty(myObj, 'foo');
    ```
    该方法返回一个布尔值。如果删除成功或删除的属性不存在，则返回true，如果删除失败，删除的属性依然还在，则返回false。

- Reflect.get(target, propertyKey[, receiver]): 获取对象身上某个属性的值，类似于 target[name]。
    - Reflect.get方法查找并返回target的name属性，如果没有，则返回undefined。
    ```javascript
    var myObject = {
      foo: 1,
      bar: 2,
      get baz() {
        return this.foo + this.bar;
      },
    }
    
    Reflect.get(myObject, 'foo') // 1
    Reflect.get(myObject, 'bar') // 2
    Reflect.get(myObject, 'baz') // 3
    ```
  
    - 读取函数的this绑定的receiver
    ```js
    var myObject = {
      foo: 1,
      bar: 2,
      get baz() {
        return this.foo + this.bar;
      },
    };
    
    var myReceiverObject = {
      foo: 4,
      bar: 4,
    };
    
    Reflect.get(myObject, 'baz', myReceiverObject) // 8
    ```
  
    - 如果第一个参数不是对象，则Reflect.get则会报错。 


- Reflect.getOwnPropertyDescriptor(target, propertyKey): 类似于 Object.getOwnPropertyDescriptor()。如果对象中存在该属性，则返回对应的属性描述符，否则返回 undefined。

- Reflect.getPrototypeOf(target): 类似于 Object.getPrototypeOf()。

- Reflect.has(target, propertyKey): 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
    - Reflect.has对应 name in obj 里面的in操作
    ```javascript
    var myObject = {
      foo: 1,
    };
    
    // 旧写法
    'foo' in myObject // true
    
    // 新写法
    Reflect.has(myObject, 'foo') // true
    ```
    如果第一个参数不是对象，Reflect.has和in都会报错。

- Reflect.isExtensible(target): 类似于 Object.isExtensible().

- Reflect.ownKeys(target): 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable 影响).

- Reflect.preventExtensions(target): 类似于 Object.preventExtensions()。返回一个Boolean。

- Reflect.set(target, propertyKey, value[, receiver]): 将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
    - Reflect.set方法设置target对象的name属性等于value。
    ```javascript
    var myObject = {
        foo: 1,
        set bar(value) {
          return this.foo = value;
        },
    }
    
    myObject.foo // 1
    
    Reflect.set(myObject, 'foo', 2);
    myObject.foo // 2
    
    Reflect.set(myObject, 'bar', 3)
    myObject.foo // 3
    ```
  
    - 如果name属性设置的赋值函数，则赋值函数的this绑定receiver。
    ```javascript
    var myObject = {
        foo: 4,
        set bar(value) {
          return this.foo = value;
        },
    };
    
    var myReceiverObject = {
      foo: 0,
    };
    
    Reflect.set(myObject, 'bar', 1, myReceiverObject);
    myObject.foo // 4
    myReceiverObject.foo // 1
    ```

- Reflect.setPrototypeOf(target, prototype): 设置对象原型的函数。返回一个 Boolean，如果更新成功，则返回 true。





