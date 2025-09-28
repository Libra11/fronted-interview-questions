# 箭头函数为何不能作为构造函数使用？

在箭头函数中，`this`指向的是定义时所在的对象，而不是使用时所在的对象。换句话说，**箭头函数没有自己的this，而是继承父作用域中的this**。

看个例子:

```javascript
var person = {
  name:'张三',
  age:18,
  getName:function(){
     console.log('我的名字是：'+this.name)
  },
  getAge:()=>{
     console.log('我的年龄是：'+this.age)
  }
}

person.getName() // 我的名字是张三
person.getAge()  // 我的年龄是undefined

```

`person.getName()`中`this`指向函数的调用者，也就是`person`实例，因此`this.name = "张三"`。

`getAge()`通过箭头函数定义，而箭头函数是没有自己的`this`，会继承父作用域的`this`，因此`person.getAge()`执行时，此时的作用域指向`window`，而`window`没有定义`age`属性，所有报`undefined`。

从例子可以得出：**对象中定义的函数使用箭头函数是不合适的**。


**先解答下标题问题，为啥箭头函数不能作为构造函数？**

```javascript
// 构造函数生成实例的过程
function Person(name,age){
  this.name = name
  this.age = age
}
var p = new Person('张三',18)

//new关键字生成实例过程如下
// 1. 创建空对象p
var p = {}
// 2. 将空对象p的原型链指向构造器Person的原型
p.__proto__ = Person.prototype
// 3. 将Person()函数中的this指向p
// 若此处Person为箭头函数，而没有自己的this，call()函数无法改变箭头函数的指向，也就无法指向p。
Person.call(p)

```

构造函数是通过new关键字来生成对象实例，生成对象实例的过程也是通过构造函数给实例绑定this的过程，而箭头函数没有自己的this。创建对象过程，`new` 首先会创建一个空对象，并将这个空对象的`__proto__`指向构造函数的`prototype`，从而继承原型上的方法，但是箭头函数没有`prototype`。因此不能使用箭头作为构造函数，也就不能通过new操作符来调用箭头函数。