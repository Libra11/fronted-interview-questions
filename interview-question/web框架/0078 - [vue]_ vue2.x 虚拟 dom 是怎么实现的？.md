# [vue]: vue2.x 虚拟 dom 是怎么实现的？

- Issue: #78
- State: open
- Labels: web框架
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/78
- Created: 2023-03-11T08:57:17Z
- Updated: 2023-03-11T09:00:32Z

## Body

## virtual-dom 实现之一: snabbdom

vue2.0就是使用的snabbdom                 
一个简单的使用实例：
```javascript
var snabbdom = require('snabbdom');
var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);
var h = require('snabbdom/h').default; // helper function for creating vnodes

var container = document.getElementById('container');

var vnode = h('div#container.two.classes', {on: {click: someFn}}, [
  h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
  ' and this is just normal text',
  h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
]);
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);

var newVnode = h('div#container.two.classes', {on: {click: anotherEventHandler}}, [
  h('span', {style: {fontWeight: 'normal', fontStyle: 'italic'}}, 'This is now italic type'),
  ' and this is still just normal text',
  h('a', {props: {href: '/bar'}}, 'I\'ll take you places!')
]);
// Second `patch` invocation
patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
```


### snabbdom 核心api
- snabbdom.init:
  The core exposes only one single function snabbdom.init. This init takes a list of modules and returns a patch function that uses the specified set of modules.
```javascript
var patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/style').default,
]);
```

- patch:
```javascript
patch(oldVnode, newVnode);
```

- snabbdom/h:
  It is recommended that you use snabbdom/h to create vnodes. h accepts a tag/selector as a string, an optional data object and an optional string or array of children.
```javascript
var h = require('snabbdom/h').default;
var vnode = h('div', {style: {color: '#000'}}, [
  h('h1', 'Headline'),
  h('p', 'A paragraph'),
]);
```

- snabbdom/tovnode:
  Converts a DOM node into a virtual node. Especially good for patching over an pre-existing, server-side generated content.
```javascript
var snabbdom = require('snabbdom')
var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);
var h = require('snabbdom/h').default; // helper function for creating vnodes
var toVNode = require('snabbdom/tovnode').default;

var newVNode = h('div', {style: {color: '#000'}}, [
  h('h1', 'Headline'),
  h('p', 'A paragraph'),
]);

patch(toVNode(document.querySelector('.container')), newVNode)
```

### h函数 和 patch 的使用
例如下面的一个dom 结构：
```html
<ul id="list">
    <li class="item">item1</li>
    <li class="item">item2</li>
</ul>
```
用h函数来表示，就如下形式：
```javascript
let vnode = h('ul#list', {}, [
    h('li.item', {}, 'item1'),
    h('li.item', {}, 'item2')
])
```
作用就是模拟的一个真实节点。

patch的使用方式：                 
第一种方式 patch('容器', vnode);  // 这种使用方式是直接渲染dom                            
第二种是用方式: patch(oldVnode, newVnode);         // 这种方式会自动对比dom的差异性，然后只渲染我们需要dom;

一个简单的使用实例：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>snabbdom</title>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/h.js"></script>
</head>
<body>
<div id="container"></div><br>

<button id="btn-change">change</button>


<script>
    let snabbdom = window.snabbdom;
    let container = document.getElementById('container');
    let buttonChange = document.getElementById('btn-change');

    // 定义patch
    let patch = snabbdom.init([
        snabbdom_class,
        snabbdom_props,
        snabbdom_style,
        snabbdom_eventlisteners
    ]);

    // 定义h
    let h = snabbdom.h;

    // 生成vnode
    let vnode = h('ul#list', {}, [
        h('li.item', {}, 'item1'),
        h('li.item', {}, 'item2')
    ]);
    patch(container, vnode);

    // 模拟一个修改的情况
    buttonChange.addEventListener('click', function () {
        let newVnode = h('ul#list', {}, [
            h('li.item', {}, 'item1'),
            h('li.item', {}, 'item B'),
            h('li.item', {}, 'item 3')
        ]);
        patch(vnode, newVnode);
    })
</script>
</body>
</html>
```

### snabbdom 的使用实例
```html
<body>
<div id="container"></div>
<br>
<button id="btn-change">change</button>
<script>
    let snabbdom = window.snabbdom;
    let container = document.getElementById('container');
    let buttonChange = document.getElementById('btn-change');

    // 定义patch
    let patch = snabbdom.init([
        snabbdom_class,
        snabbdom_props,
        snabbdom_style,
        snabbdom_eventlisteners
    ]);

    // 定义h
    let h = snabbdom.h;
    let data = [
        {
            name: 'yanle',
            age: '20',
            address: '重庆'
        },
        {
            name: 'yanle2',
            age: '25',
            address: '成都'
        },
        {
            name: 'yanle3',
            age: '27',
            address: '深圳'
        }
    ];

    data.unshift({
        name: '姓名',
        age: '年龄',
        address: '地址'
    });

    let vnode;
    function render(data) {
        let newVnode = h('table', {style: {'font-size': '16px'}}, data.map(function (item) {
            let tds = [];
            let i ;
            for (i in item) {
                if(item.hasOwnProperty(i)) {
                    tds.push(h('td', {},   h('a', {props: {href: '/foo'}}, item[i])))
                }
            }
            return h('tr', {}, tds)
        }));

        if(vnode) {
            patch(vnode, newVnode);
        } else {
            patch(container, newVnode);
        }

        vnode = newVnode;
    }

    // 初次渲染
    render(data);
    buttonChange.addEventListener('click', function () {
        data[1].age=30;
        data[1].address = '非洲';
        render(data);
    });
</script>
</body>
```


##  diff算法
### 概念
就是找出两个文件的不同

diff 算法是非常复杂的，实现难度非常大， 源码两非常大。 所以需要去繁就简，明白流程，不关心细节。                 
在vdom中，需要找出本次dom 必须更新的节点来更新，其他的不用更新。找出这个过程就是diff算法实现的。找出前后两个虚拟dom的差异。


### diff实现的过程
这里以snabbdom为例子：                 
patch(container, vnode); patch(vnode, newVnode); 这两个方法里面就使用到了diff算法。 用patch方法来解析diff算法流程核心。

**patch(container, vnode)**                             
![02-11-1](https://user-images.githubusercontent.com/22188674/224475327-0b8f19b3-7a35-40ec-960b-6040852f1a7d.png)

如果上面的数据， 我们怎么构建真正的dom 结构：
```javascript
let createElement = function(vnode) {
    let tag = vnode.tag;
    let attrs = vnode.attrs || {};
    let children = vnode.children || {};
    
    if(!tag) return null;
    
    // 创建元素
    let elem = document.createElement(tag);
    
    // 属性
    let attrName;
    for (attrName in attrs) {
        if(attrs.hasOwnProperty(attrName)) {
            elem.setAttribute(attrName, attrs[attrName])
        }
    }
    
    // 子元素
    children.forEach(function (childVnode) {
        // 给 elem 添加元素
        elem.appendChild(createElement(childVnode))
    });
    
    return elem;
};
```

**patch(vnode, newVnode)**                      
![02-11-2](https://user-images.githubusercontent.com/22188674/224475289-d2f8b10a-1f02-4126-9f2e-b813b0387c84.png)                          
![02-11-3](https://user-images.githubusercontent.com/22188674/224475309-45c68933-3aa8-402a-8353-d09b506e0d46.png)

伪代码实现如下
```javascript
let createElement = function(vnode) {
    let tag = vnode.tag;
    let attrs = vnode.attrs || {};
    let children = vnode.children || {};

    if(!tag) return null;

    // 创建元素
    let elem = document.createElement(tag);

    // 属性
    let attrName;
    for (attrName in attrs) {
        if(attrs.hasOwnProperty(attrName)) {
            elem.setAttribute(attrName, attrs[attrName])
        }
    }

    // 子元素
    children.forEach(function (childVnode) {
        // 给 elem 添加元素
        elem.appendChild(createElement(childVnode))
    });

    return elem;
};
```

### diff算法的其他内容
- 节点的新增和删除
- 节点重新排序
- 节点属性、样式、事件绑定
- 如果极致压榨性能

