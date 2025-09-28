# react lazy import 实现懒加载的原理是什么？

- Issue: #131
- State: open
- Labels: web框架
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/131
- Created: 2023-03-19T14:47:35Z
- Updated: 2023-03-19T14:47:35Z

## Body

React 的 `lazy` 函数可以实现代码分割，即将代码按需加载，以达到优化页面加载速度的目的。它的原理是基于 JavaScript 的动态 `import()` 方法实现的。

当我们使用 `lazy` 函数加载一个组件时，React 会自动将该组件的代码单独打包成一个单独的 JavaScript 文件，并在需要时通过网络请求加载该文件。具体来说，`lazy` 函数返回的是一个特殊的组件，该组件在加载时会调用传入的函数并异步加载组件代码。一般来说，我们会将异步加载的组件通过 `import()` 方法引入，例如：

```js
jsCopy codeconst MyComponent = React.lazy(() => import('./MyComponent'));
```

这里的 `import()` 方法会返回一个 Promise，该 Promise 在组件代码加载完成后会 resolve，然后通过 React 渲染该组件。

需要注意的是，由于异步加载组件的代码是在运行时执行的，而不是在构建时，因此需要使用符合 ECMAScript 标准的动态 `import()` 方法。此外，在使用 `lazy` 函数时还需要将组件包裹在 `Suspense` 组件中，以处理组件加载时的占位符或错误状态。例如：

```js
jsCopy codeimport React, { lazy, Suspense } from 'react';

const MyComponent = lazy(() => import('./MyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}
```

这里的 `fallback` 属性指定了组件加载时的占位符，当组件加载完成后会自动替换成真正的组件。

综上所述，React 的 `lazy` 函数通过使用动态 `import()` 方法实现了组件代码的按需加载，以达到优化页面加载速度的目的。
