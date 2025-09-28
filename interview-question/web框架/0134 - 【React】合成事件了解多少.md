# 【React】合成事件了解多少

- Issue: #134
- State: open
- Labels: web框架
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/134
- Created: 2023-03-19T14:57:58Z
- Updated: 2023-03-19T14:57:59Z

## Body

在 React 中，合成事件是一种封装了浏览器原生事件对象的高级事件机制。它是由 React 提供的一种用于处理事件的抽象层，可以让开发者更方便地处理和管理事件。

React 的合成事件机制提供了一些优秀的特性：

1. 跨浏览器兼容性：React 的合成事件可以屏蔽浏览器的差异，保证在各种浏览器上运行一致。

2. 性能优化：React 的合成事件可以对事件进行池化处理，重用事件对象，避免创建大量的事件对象，从而提高性能。

3. 事件委托：React 的合成事件可以实现事件委托机制，将事件处理程序绑定在组件树的根节点上，统一管理和处理组件内部和外部的事件，从而避免多次绑定事件处理程序的问题。

4. 支持自定义事件：React 的合成事件可以支持自定义事件，开发者可以自定义组件事件，提供更多的自定义能力。

React 的合成事件机制通过事件冒泡和事件委托来实现。当在组件中触发事件时，React 会将该事件包装成一个合成事件对象，并在组件树中冒泡传递，直到根节点处。在组件树中，React 使用事件委托机制将事件处理程序绑定到根节点上，统一处理所有组件的事件。

在处理合成事件时，React 提供了一些常用的事件处理函数，例如 `onClick`、`onMouseOver`、`onSubmit` 等，可以在组件中直接使用。此外，开发者还可以自定义事件处理函数，通过 `on` 前缀加上事件名称的方式来绑定自定义事件。例如，我们可以定义一个 `onCustomEvent` 方法来处理自定义事件：

```jsx
jsxCopy codeclass MyComponent extends React.Component {
  handleCustomEvent() {
    // 处理自定义事件
  }

  render() {
    return (
      <div>
        <button onClick={this.handleCustomEvent}>触发自定义事件</button>
      </div>
    );
  }
}
```

在这个例子中，我们定义了一个名为 `handleCustomEvent` 的方法来处理自定义事件，然后在组件中通过 `onClick` 属性来绑定该方法。当用户点击按钮时，React 会将该事件包装成一个合成事件对象，并调用 `handleCustomEvent` 方法来处理事件。
