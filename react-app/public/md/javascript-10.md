# let 和 const 与 var 的区别？

## let 和 const 与 var 的区别

1、不存在变量提升                                                  
必须先定义后使用，否则报错

2、暂时性死区                     
在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

3、不允许重复申明/不允许在函数内部重新申明参数（也算重复申明）

4.1 SE5的作用域                     
1）、内层变量覆盖外层的变量                                  
2）、用来计数的循环变量会泄露为全局变量

5、const是一个常量，一旦声明，就不能改变。而且在申明的时候必须初始化，不能留到后面赋值。

6、在ES5里面，var 在全局作用域下申明的变量，会自动生为window的属性:                            
没法在编译过程爆出变量为申明的错误，语法上顶层对象有一个实体含义的对象这样肯定不合适。                             
用var定义的依然会升级为顶层对象(全局对象)window的属性；但是let,const申明则不会。


## Comments / Answers

---

**BruceYuj** at 2025-02-10T13:33:31Z

- 相同点： var, let, const 都是 javascript 当中用来声明变量的。
- 不同点：
var statement的 created 阶段和 initialized 阶段是同时的，var statement在 created 阶段被初始化为 undefined。这也是我们所说的 var declaration hoisting。
let declaration 只有 created 阶段被 hoisting，但是 initial 和 assign阶段是同时的，并且是在引擎的执行阶段。因此，我们在 let declaration 之前使用变量会报 reference error，这意味着bound name 已经被分配了（created），但是我们还没有进行initialized，因此无法使用。并且该变量后面都无法使用，相当于该变量一直处于 created 阶段，形成类似于死锁的情形。
const declaration 的created 阶段同样会被hoisting。并且我们在声明 const variable 时必须跟上 initializer，也就是 assignment expression。这也是 const 和 let 的区别之一。const declaration 在被初始化后无法再次赋值。
那么什么是 temporal dead zone? 就是 let and const declaration 在 created 阶段后暂时无法使用，也就进入了暂时性死区。

另外我们需要注意的是，在ECMAScript 文档当中， let 和 const 被称为 lexical declaration，而 var 被称为 variable declaration。

具体可以看我几年前写的文章： **[从 ECMAScript 中看几种 declaration](https://github.com/BruceYuj/front-end-interview-summary/blob/master/docs/front-end/JavaScript/4-javascript-declaration.md)**