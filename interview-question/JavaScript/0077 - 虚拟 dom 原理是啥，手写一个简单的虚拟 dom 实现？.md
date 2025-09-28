# 虚拟 dom 原理是啥，手写一个简单的虚拟 dom 实现？

- Issue: #77
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/77
- Created: 2023-03-11T08:54:21Z
- Updated: 2023-10-01T13:56:09Z

## Body



## vdom 概念
用JS模拟DOM结构。             
DOM变化的对比，放在JS层来做。               
提升重绘性能。

比如有abc 三个dom， 如果我们要删除b dom, 以前浏览器的做法是 全部删除abc dom ， 然后 在添加b dom 。这样做的成本会非常高。

## 用JS模拟 dom
例如下面的一个dom 结构：
```html
<ul id="list">
    <li class="item">item1</li>
    <li class="item">item2</li>
</ul>
```

这样的dom 结构，可以模拟为下面的JS :
```javascript
let dom = {
    tag: 'ul',
    attrs: {
        id: 'list'
    },
    children: [
        {
            tag: 'li',
            attrs: {className: 'item'},
            children: ['item1']
        },
        {
            tag: 'li',
            attrs: {className: 'item'},
            children: ['item2']
        }
    ]
}
```
浏览器操作dom 是花销非常大的。执行JS花销要小非常多，所以这就是为什么虚拟dom 出现的一个根本原因。

## jquery实现virtual-dom

### 一个需求场景
1、数据生成表格。 2、随便修改一个信息，表格也会跟着修改。
```html
<body>
<div id="container"></div>
<br>
<button id="btn-change">change</button>
<script>
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

    // 渲染函数
    function render(data) {
        let $container = document.getElementById('container');
        $container.innerHTML = '';

        let $table = document.createElement('table');
        $table.setAttribute('border', true);
        $table.insertAdjacentHTML('beforeEnd', `<tr>
                                    <td>name</td>
                                    <td>age</td>
                                    <td>address</td>
                                    </tr>`);

        data.forEach(function (item) {
            $table.insertAdjacentHTML('beforeEnd',
                `<tr>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.address}</td>
                </tr>`
            )
        });

        $container.appendChild($table);
    }

    // 修改信息
    let button = document.getElementById('btn-change');
    button.addEventListener('click', function () {
        data[1].name = '徐老毕';
        data[1].age = 30;
        data[1].address  = '深圳';
        render(data);
    });
    render(data);
</script>
</body>
```
实际上上面的这段代码也是不符合预期的，因为每次使用render 方法，都会全部渲染整个table, 但是并未没有只渲染我们想要的第二行。

**遇到的问题**：                  
DOM 操作是非常 "昂贵" 的， JS 运行效率高。虚拟dom 的核心就是diff算法，对比出不同的dom数据，定点渲染不同的数据。


## Comments / Answers

---

**yanlele** at 2023-10-01T13:56:08Z

补充文章： https://github.com/linwu-hi/code-interview/issues/90
