# canvas 性能为何会比 html/css 好？【热度: 242】

- Issue: #300
- State: open
- Labels: JavaScript, 百度
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/300
- Created: 2023-04-23T13:22:02Z
- Updated: 2023-04-23T13:22:03Z

## Body

Canvas 和 HTML/CSS 是两种不同的技术，各自有着自己的优势和适用场景。

Canvas 是一种基于 JavaScript 的 2D/3D 绘图技术，它允许开发者直接操作像素，可以实现复杂的图形、动画和游戏等效果，其性能比 HTML/CSS 要好的原因主要有以下几点：

1. 直接操作像素：Canvas 允许开发者直接操作像素，不需要经过复杂的 DOM 计算和渲染，能够更快地响应用户操作，提高交互的流畅性。

2. GPU 加速：现代浏览器已经对 Canvas 进行了 GPU 加速，使得 Canvas 能够更加高效地处理大量的图形和动画。

3. 没有样式计算：与 HTML/CSS 不同，Canvas 不需要进行样式计算和布局，能够减少浏览器的重绘和重排，从而提高渲染性能。

4. 可以缩放和裁剪：Canvas 可以进行缩放和裁剪操作，能够适应不同的屏幕分辨率和大小，同时也可以减少不必要的绘图计算。

总之，Canvas 能够更加高效地处理大量的图形和动画，适用于需要复杂绘图和动画的场景，而 HTML/CSS 更适合处理文本和静态布局，适用于构建 Web 页面。
