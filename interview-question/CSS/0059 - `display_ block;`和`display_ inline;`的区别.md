# `display: block;`和`display: inline;`的区别

- Issue: #59
- State: open
- Labels: CSS
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/59
- Created: 2023-03-10T15:19:36Z
- Updated: 2023-03-10T15:19:37Z

## Body

``block``元素特点：

1.处于常规流中时，如果``width``没有设置，会自动填充满父容器
2.可以应用``margin/padding``
3.在没有设置高度的情况下会扩展高度以包含常规流中的子元素
4.处于常规流中时布局时在前后元素位置之间（独占一个水平空间）
5.忽略``vertical-align``

``inline``元素特点

1.水平方向上根据``direction``依次布局
2.不会在元素前后进行换行
3.受``white-space``控制
4.``margin/padding``在竖直方向上无效，水平方向上有效
5.``width/height``属性对非替换行内元素无效，宽度由元素内容决定
6.非替换行内元素的行框高由``line-height``确定，替换行内元素的行框高由``height``,``margin``,``padding``,``border``决定
6.浮动或绝对定位时会转换为``block``
7.``vertical-align``属性生效

