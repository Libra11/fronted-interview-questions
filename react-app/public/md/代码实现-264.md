# 请实现一个 add 函数，满足以下功能

### 题目如下

```
add(1).getValue(); 	// 1
add(1)(2).getValue();  	// 3
add(1)(2)(3).getValue()；  // 6
add(1)(2, 3).getValue();   // 6
add(1, 2)(3).getValue();   // 6
add(1, 2, 3).getValue();   // 6
```

### 解法


```js
function add(...args) {
  function innerAdd(...innerArgs) {
    args.push(...innerArgs);
    return innerAdd;
  }

  innerAdd.getValue = function() {
    return args.reduce((acc, curr) => acc + curr, 0);
  };

  return innerAdd;
}


// console.log(add(1)(2).getValue()); // 输出: 3
```



## Comments / Answers

---

**wuhuaizai** at 2023-09-14T06:59:56Z

解法1，2只是柯里化的话，不能实现add(1) // 1这种操作吧，只是柯里化的话add(1)得到的应该还是函数，是不是漏了些代码了？

---

**wuhuaizai** at 2023-09-14T07:24:15Z

这个题目的意思是想要在console.log里显示注释后的结果？所以利用console.log会隐式调用toString来重写toString方法实现？

---

**yanlele** at 2023-09-15T03:21:41Z

> 解法1，2只是柯里化的话，不能实现add(1) // 1这种操作吧，只是柯里化的话add(1)得到的应该还是函数，是不是漏了些代码了？

@wuhuaizai 应该是乱入了；

---

**yanlele** at 2023-09-15T03:28:06Z

> 这个题目的意思是想要在console.log里显示注释后的结果？所以利用console.log会隐式调用toString来重写toString方法实现？

@wuhuaizai 感觉问题的，问法有问题；

```
add(1)(2);  	// 3
add(1)(2)(3)；  // 6
add(1)(2, 3);   // 6
add(1, 2)(3);   // 6
```

明显是一个链式调用， 返回的肯定是一个函数才支持链式调用；但是又要得到输出值， 只能有一个 获取值的办法； toString 本意确实是想通过隐式调用来实现， 但是不知道为何， 还是输出的是函数；


可以改为这样：
```js
function add(...args) {
  function innerAdd(...innerArgs) {
    args.push(...innerArgs);
    return innerAdd;
  }

  innerAdd.getValue = function() {
    return args.reduce((acc, curr) => acc + curr, 0);
  };

  return innerAdd;
}


// console.log(add(1)(2).getValue()); // 输出: 3
```