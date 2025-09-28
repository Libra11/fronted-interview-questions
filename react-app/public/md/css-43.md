# 未知高度和宽度元素的水平垂直居中的方案有哪些， 简单手写一下？

## 未知高度和宽度元素的水平垂直居中
1、当要被居中的元素是inline或者inline-block元素
```
 #container{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}

#center{

}
```


2、利用Css3的transform，可以轻松的在未知元素的高宽的情况下实现元素的垂直居中。
```
#container{
    position:relative;
}
#center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

3、flex
```
#container{
    display:flex;
    justify-content:center;
    align-items: center;
}

#center{

}
```