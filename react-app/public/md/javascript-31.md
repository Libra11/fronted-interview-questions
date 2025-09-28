# JS 中继承方式有哪些？

### 1、借助构造函数实现继承

call和apply改变的是JS运行的上下文:             
```javascript
/*借助构造函数实现继承*/
function Parent(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    }
}

function Child(name) {
    Parent.call(this, name);
    this.type = 'child1'
}

let child = new Child('yanle');
child.getName();
console.log(child.type);
```
父类的this指向到了子类上面去，改变了实例化的this 指向，导致了父类执行的属性和方法，都会挂在到	子类实例上去；                     
缺点：父类原型链上的东西并没有被继承；


### 2、通过原型链实现继承
```javascript
/*通过原型链实现继承*/
function Parent2(){
    this.name='parent2'
}

function Child2(){
    this.type='child2'
}

Child2.prototype=new Parent2();
console.log(new Child2());
```

Child2.prototype是Child2构造函数的一个属性，这个时候prototype被赋值了parent2的一个实例，实例化了新的对象Child2()的时候，
会有一个__proto__属性，这个属性就等于起构造函数的原型对象，但是原型对象被赋值为了parent2的一个实例，
所以new Child2的原型链就会一直向上找parent2的原型

var s1=new Child2();                
var s2=new Child2();                    
s1.__proto__===s2.__proto__;//返回true                        

缺点：通过子类构造函数实例化了两个对象，当一个实例对象改变其构造函数的属性的时候，
那么另外一个实例对象上的属性也会跟着改变（期望的是两个对象是隔离的赛）；原因是构造函数的原型对象是公用的；


### 3、组合方式
```javascript
/*组合方式*/
function Parent3(){
    this.name='parent3';
    this.arr=[1,2,3];
}

function Child3(){
    Parent3.call(this);
    this.type='child';
}

Child3.prototype=new Parent3();
var s3=new Child3();
var s4=new Child3();
s3.arr.push(4);
console.log(s3,s4);
```

**优点:**这是最通用的使用方法，集合了上面构造函数继承，原型链继承两种的优点。                      
**缺点:**父类的构造函数执行了2次，这是没有必要的，                            
constructor指向了parent了


### 4、组合继承的优化
```javascript
/*组合继承的优化1*/
function Parent4(){
    this.name='parent3';
    this.arr=[1,2,3];
}

function Child4(){
    Parent4.call(this);
    this.type='child5';
}

Child4.prototype=Parent4.prototype;
var s5=new Child4();
var s6=new Child4()
```

**缺点：**s5 instaceof child4 //true, s5 instanceof Parent4//true                                
我们无法区分一个实例对象是由其构造函数实例化，还是又其构造函数的父类实例化的                              
s5.constructor  指向的是Parent4;//原因是子类原型对象的constructor 被赋值为了父类原型对象的	constructor,所以我们使用constructor的时候，肯定是指向父类的                           
Child3.constructor 也有这种情况                               

### 5、组合继承的优化2
```javascript
function Parent5() {
    this.name = 'parent5';
    this.play = [1, 2, 3];
}

function Child5() {
    Parent5.call(this);
    this.type = 'child5'
}

Child5.prototype = Object.create(Parent5.prototype);
//这个时候虽然隔离了，但是constructor还是只想的Parent5的，因为constructor会一直向上找
Child5.prototype.constructor=Child5;

var s7=new Child5();
console.log(s7 instanceof Child5,s7 instanceof Parent5);
console.log(s7.constructor);
```

通过Object.create来创建原型中间对象，那么这么来的话，chiild5的对象prototype获得的是parent5	父类的原型对象；                    
Object.create创建的对象，原型对象就是参数；                            
    
    
### 6、ES 中的继承
Class 可以通过extends关键字实现继承，让子类继承父类的属性和方法。extends 的写法比 ES5 的原型链继承，要清晰和方便很多。
```js
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```