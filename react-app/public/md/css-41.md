# 垂直居中的方案有哪些， 简单手写一下？

## 垂直居中的方案

1、
```
line-height: 200px;
vertical-align: middle;
```


2、CSS Table
```
#parent {display: table;}
#child {
display: table-cell;
vertical-align: middle;
}
```

3、Absolute Positioning and Negative Margin
```
#parent {position: relative;}
#child {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%;
}
```


4、Absolute Positioning and Stretching
```
#parent {position: relative;}
#child {
position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
    height: 30%;
    margin: auto;
}
```

5、Equal Top and Bottom Padding
```
#parent {
    padding: 5% 0;
}
#child {
    padding: 10% 0;
}
```