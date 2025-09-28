# vue 的 keep-alive 的原理是啥？

- Issue: #119
- State: open
- Labels: web框架
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/119
- Created: 2023-03-19T12:38:30Z
- Updated: 2023-10-01T13:50:21Z

## Body

`<keep-alive>` 是 Vue.js 提供的一个抽象组件，它可以使被包含的组件保留在内存中，而不是每次重新渲染的时候销毁并重建，从而提高了应用的性能。

具体来说，`<keep-alive>` 的实现原理如下：

1. 当一个组件被包裹在 `<keep-alive>` 组件内时，它会被缓存起来，而不是被销毁。
2. 如果这个组件被包裹的父组件从它的视图中移除，那么这个组件不会被销毁，而是被缓存起来。
3. 如果这个组件再次被包裹的父组件添加回视图中，那么它会被重新激活，而不是重新创建。

`<keep-alive>` 组件通过一个内部的缓存对象来缓存组件实例，这个缓存对象会在组件被包裹在 `<keep-alive>` 组件中时创建。当一个被缓存的组件需要被激活时，`<keep-alive>` 组件会从缓存中取出该组件的实例并将其挂载到视图上，从而实现了组件的复用。

需要注意的是，被缓存的组件并不是一直存在于内存中，它们会在一定条件下被销毁，比如缓存的组件数量超过了一定的阈值，或者系统内存占用过高等。

## Comments / Answers

---

**yanlele** at 2023-10-01T13:50:21Z

深入分析： https://github.com/linwu-hi/code-interview/issues/76
