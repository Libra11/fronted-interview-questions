# [vue]: 是如何实现 MVVM 的？

## 引入：使用jquery和其他框架的区别

### 原生JS实现一个todo-list
```html
<body>
<div>
    <input type="text" name="" id="txt-title"> <br>
    <button id="btn-submit">submit</button>
</div>
<div>
    <ul id="ul-list"></ul>
</div>
<script>
    let $txtTitle = document.getElementById('txt-title');
    let $buttonSubmit = document.getElementById('btn-submit');
    let $ulList = document.getElementById('ul-list');
    $buttonSubmit.addEventListener('click', function () {
        let title = $txtTitle.value;
        if(!title) return false;

        let $li = document.createElement('li');
        $li.innerText = title;

        $ulList.appendChild($li);
        $txtTitle.value = '';
    })
</script>
</body>
```


### vue实现todo-list
```html
<body>
<div id="app">
    <div>
        <input v-model="title"> <br>
        <button id="btn-submit" v-on:click="add">submit</button>
    </div>
    <div>
        <ul id="ul-list">
            <li v-for="item in list">{{item}}</li>
        </ul>
    </div>
</div>
<script>
    let vm = new window.Vue({
        el: '#app',
        data: {
            title: '',
            list: []
        },
        methods: {
            add: function () {
                this.list.push(this.title);
                this.title = '';
            }
        }
    })
</script>
</body>
```

### 两者之间的区别
- 数据和视图分离(开放封闭原则： 扩展开放，修改封闭)
- 数据驱动视图


### 对mvvm的理解
具体的理解自己再去整理

MVVM框架的三大要素：                                                                        
响应式、模板引擎、渲染


## 响应式的实现
修改data属性之后，立马就能监听到。                 
data属性挂在到vm实例上面。

有下面的一个问题，我们是如何监听属性的获取和属性的赋值的。
```javascript
let obj = {
    name: 'yanle',
    age: 25
};
console.log(obj.name);
obj.age = 26;
```

是通过**Object.defineProperty** 实现的, 下面的代码就可以实现一个完整的属性修改和获取的监听。
```javascript
let vm = {};
let data = {
    name: 'yanle',
    age: 25
};
let key, value;
for (key in data) {
    (function (key) {
        Object.defineProperty(vm, key, {
            get: function () {
                console.log('get', data[key]);
                return data[key];           // data的属性代理到vm 上 
            },
            set: function (newValue) {
                console.log('set', newValue);
                data[key] = newValue;
            }
        })
    })(key)
}
```

## vue中的模板

**模板**                              
本质就是字符串；                        
有逻辑： if for 等；                  
跟html格式很像， 但是区别很大;                              
最终要转为HTML来现实；                               
模板需要用JS代码来实现， 因为有逻辑，只能用JS来实现；


**render函数-with用法**：
```javascript
let obj = {
    name: 'yanle',
    age: 20,
    getAddress: function () {
        alert('重庆')
    }
};
// 不用with 的情况
// function fn() {
//     alert(obj.name);
//     alert(obj.age);
//     obj.getAddress();
// }
// fn();

// 使用with的情况
function fn1() {
    with (obj) {
        alert(name);
        alert(age);
        getAddress();
    }
}
fn1();
```
这种with 的使用方法就如上所述。但是尽量不要用，因为《JavaScript语言精粹》中，作者说过，这种使用方式会给代码的调试带来非常大的困难。                               
但是vue源码中的render 就是用的这个;


**render函数**:                                   
<img width="274" alt="02-12-1" src="https://user-images.githubusercontent.com/22188674/224475416-9567c516-981f-4399-9128-4efcb70e8502.png">                               
![02-12-2](https://user-images.githubusercontent.com/22188674/224475405-34baf640-f897-4a26-9817-109e8b4c1bde.png)

模板中的所有信息都包含在了render 函数中。                        
一个特别简单的示例:
```javascript
let vm = new Vue({
        el: '#app',
        data: {
            price: 200
        }
    });

    // 一下是手写的
    function render() {
        with (this) {               // 就是vm
            _c(
                'div',
                {
                    attr: {'id': 'app'}
                },
                [
                    _c('p', [_v(_s(price))])
                ]
            )
        }
    }

    function render1() {
        return vm._c(
            'div',
            {
                attr: {'id': 'app'}
            },
            [
                _c('p', [vm._v(vm._s(vm.price))])       // vm._v 是创建文本， _s 就是toString
            ]
        )
    }
```

如果我们用一个复杂的例子来描述这个东西。在源码中， 搜索code.render, 然后在在此之前打印render 函数，就可以看看这个到底是什么东西了。
```javascript
var createCompiler = createCompilerCreator(function baseCompile (
    template,
    options
) {
    var ast = parse(template.trim(), options);
    if (options.optimize !== false) {
        optimize(ast, options);
    }
    var code = generate(ast, options);
    console.log(code.render);
    return {
        ast: ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
    }
});
```
然后运行， 就可以看到到底render 函数是什么东西了。 就可以截取源码出来看了。                  
相对应的模板如下:
```html
<div id="app">
    <div>
        <input v-model="title"> <br>
        <button id="btn-submit" v-on:click="add">submit</button>
    </div>
    <div>
        <ul id="ul-list">
            <li v-for="item in list">{{item}}</li>
        </ul>
    </div>
</div>
```
截取的render函数如下：
```javascript
function codeRender() {
    with (this) {
        return _c('div',
            {attrs: {"id": "app"}},
            [
                _c('div', [
                    _c('input', {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: (title),             // 渲染 指定数据
                            expression: "title"
                        }],
                        domProps: {"value": (title)},   // 渲染 指定数据
                        on: {                       // 通过input输入事件， 修改title
                            "input": function ($event) {
                                if ($event.target.composing) return;
                                title = $event.target.value
                            }
                        }
                    }),
                    _v(" "),                // 文本节点
                    _c('br'),
                    _v(" "),
                    _c('button', {          // dom 节点
                            attrs: {"id": "btn-submit"},
                            on: {"click": add}              // methods 里面的东西也都挂在this上面去了
                        },
                        [_v("submit")])]),

                _v(" "),

                _c('div', [
                    _c('ul',
                        {attrs: {"id": "ul-list"}},
                        _l((list), function (item) {                // 数组节点
                            return _c('li', [_v(_s(item))])
                        })
                    )
                ])
            ])
    }
}
```
从vue2.0开始支持预编译， 我们在开发环境下，写模板， 编译打包之后， 模板就变成了JS代码了。vue已经有工具支持这个过程。


## vue中的渲染
vue的渲染是直接渲染为虚拟dom ,这一块儿的内容，其实是借鉴的snabbdom, 非常相似，可以去看看snabbdom 就可以一目了然了。                         
vue中的具体渲染实现:                        
![02-12-03](https://user-images.githubusercontent.com/22188674/224475434-c4e33700-d223-4472-8e96-5cc7b6c04d70.png)



## 整体流程的实现

第一步： 解析模板形成render 函数
- with 用法
- 模板中的所有数据都被render 函数包含
- 模板中data的属性，变成了JS变量
- 模板中的v-model、v-for、v-on都变成了JS的逻辑
- render函数返回vnode

第二步： 响应式开始监听数据变化
- Object.defineProperty 的使用
- 讲data中的属性代理到vm 上

第三步： 首次渲染，显示页面，而且绑定数据和依赖
- 初次渲染， 执行updateComponent, 执行vm._render();
- 执行render函数， 会访问到vm.list和vm.title等已经绑定好了的数据；
- 会被详情是的get 方法监听到                           
  为何一定要监听get, 直接监听set 不行吗？ data中有很多的属性，有的被用到了，有的没有被用到。被用到的会走get, 不被用到的不会走get。
  没有被get监听的属性，set的时候也不会被坚挺。为的就是减少不必要的重复渲染，节省性能。
- 执行updateComponent的时候，会执行vdom的patch方法
- patch 讲vnode渲染为DOM， 初次渲染完成

第四步： data属性变化，出发render
- 修改属性值， 会被响应式的set监听到
- set中会执行updateComponent， 重新执行vm.render()
- 生成vnode和prevVnode, 通过patch进行对比
- 渲染到html中