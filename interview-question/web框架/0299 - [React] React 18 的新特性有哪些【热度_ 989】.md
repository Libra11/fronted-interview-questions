# [React] React 18 的新特性有哪些【热度: 989】

- Issue: #299
- State: open
- Labels: web框架
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/299
- Created: 2023-04-20T16:26:15Z
- Updated: 2024-05-12T06:11:51Z

## Body

### 18 的新特性

#### 新功能：自动批量处理

批量处理是指 React 将多个状态更新分组到一个重新渲染中，以获得更好的性能。如果没有自动批量处理，我们只对 React 事件处理程序中的更新进行批量处理。默认情况下，React 不会对
Promise、setTimeout、原生事件处理程序或任何其它事件中的更新进行批量处理。有了自动批量处理，这些更新将被自动的批量处理。

```typescript jsx
// 之前：只对 React 事件执行批量处理
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 将渲染两次，每次状态更新一次（无批量处理）
}, 1000);

// 之后：超时、Promises、本机事件处理程序
// 或任何其他事件内的更新是批处理的。

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 只会在最终重新渲染一次（这就是批量处理！）
}, 1000);
```

#### 新功能：过渡

过渡是 React 中的一个新概念，用以区分紧急和非紧急更新。

- 紧急更新 反映了直接的交互，如输入、点击、按压等。
- 过渡更新 将 UI 从一个视图过渡到另一个。

像输入、点击或按压这样的紧急更新，需要立即响应，以符合我们对物理对象行为方式的直觉。否则他们就会感到“不对劲儿”。然而，过渡是不同的，因为用户并不期望在屏幕上看到每个中间值。

例如，当你在一个下拉菜单中选择一个过滤器时，你希望过滤器按钮本身在你点击时能立即做出反应。然而，实际结果可能会单独过渡。一个小的延迟将是难以察觉的，而且往往是预期的。并且，如果你在结果渲染完成之前再次改变过滤器，你只关心看到最新的结果。

通常情况下，为了获得最佳的用户体验，一个用户输入应该同时导致一个紧急更新和一个非紧急更新。你可以在输入事件中使用 startTransition API 来告知 React 哪些是紧急更新，哪些是“过渡”：

```typescript jsx
import { startTransition } from 'react';

// 紧急：显示输入的内容
setInputValue(input);

// 将内部的任何状态更新都标记为过渡
startTransition(() => {
  // 过渡：显示结果
  setSearchQuery(input);
});
```

被 startTransition 包裹的更新被当作非紧急事件处理，如有更紧急更新，如点击或按键，则会被中断。如果一个过渡被用户中断（例如，连续输入多个字符），React 会丢弃未完成的无效的渲染，而只渲染最新的更新。

- useTransition：一个启动过渡的 Hook，包括一个值以跟踪待定状态。
- startTransition：当 Hook 不能使用时，一个启动过渡的方法。

过渡将选择并发渲染，这允许更新被中断。如果内容重新挂起，过渡也会告诉 React 继续显示当前内容，同时在后台渲染过渡内容。

#### 新的 Suspense 特性

如果组件树的某一部分还没有准备好被显示，Suspense 可以让你声明式地指定加载状态：

```typescript jsx
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

Suspense 使“UI 加载状态”成为 React 编程模型中的第一类声明式概念。这让我们可以在它上面建立更高层次的功能。

几年前，我们推出了一个有限的 Suspense 版本。然而，唯一支持的用例是用 React.lazy 拆分代码，且在服务端渲染时根本不支持。

在 React 18 中，我们增加了对服务端的 Suspense 支持，并使用并发渲染特性扩展了其功能。

React 18 中的 Suspense 在与过渡 API 结合时效果最好。如果你在过渡期间挂起，React 将防止已经可见的内容被回退取代。相反，React 会延迟渲染，直到有足够的数据加载，以防止出现糟糕的加载状态。

#### 新的客户端、服务端渲染 API

在这个版本中，我们借此机会重新设计了我们为在客户端和服务端渲染所暴露的 API。这些更改允许用户在升级到 React 18 中的新 API 时继续使用 React 17 模式下的旧 API。

**React DOM Client**

这些新的 API 现在从 react-dom/client 导出：

- createRoot：新的创建根的方法，以进行 render 或 unmount。使用它替代 ReactDOM.render。没有它，React 18 的新功能就不能工作。
- hydrateRoot：新的方法用以创建服务端渲染应用。使用它替代 ReactDOM.hydrate 与新的 React DOM 服务端 API 一起使用。没有它，React 18 的新功能就不能工作。

createRoot 和 hydrateRoot 都接受一个新的选项，叫做 onRecoverableError，以防你想在 React render 或 hydrate 从错误恢复时得到通知，以便记录。默认情况下，React会使用
reportError，或在较旧的浏览器中使用 console.error。

**React DOM Server**

这些新的 API 现在从 react-dom/server 导出，并且完全支持服务端的流式 Suspense：

- renderToPipeableStream：用于 Node 环境下的 Stream。
- renderToReadableStream：用于现代边缘运行环境，如 Deno 和 Cloudflare workers。

现有的 renderToString 方法仍然可用，但不鼓励使用。

#### 新的严格模式行为

在未来，我们希望增加一个功能，允许 React 在保留状态的同时增加和删除部分的 UI。例如，当用户从一个屏幕切出并切回时，React 应该能够立即显示之前的屏幕。要做到这一点，React 将使用与之前相同的组件状态来卸载和重新装载树。

这个功能将给 React 应用带来更好的开箱即用的性能，但需要组件对 effect 被多次装载和销毁具有弹性。大多数 effect 会正常工作而无需任何更改，但有些 effect 假设它们只被装载或销毁一次。

为了帮助浮现这些问题，React 18 为严格模式引入了一个新的仅用于开发的检查。每当组件第一次装载时，此检查将自动卸载并重新装载每个组件，并在第二次装载时恢复先前的状态。

在这个变化之前，React 会装载组件并创建 effect：

```
* React 装载组件
  * layout effect 创建
  * effect 创建
```

在 React 18 的严格模式下，React 会在开发模式下模拟卸载和重新装载组件：

```
* React 装载组件
  * layout effect 创建
  * effect 创建
* React 模拟卸载组件
  * layout effect 销毁
  * effect 销毁
* React 模拟装载组件（使用之前的状态）
  * layout effect 创建
  * effect 创建
```

#### 新的 Hook

**useId**

useId 是一个新的 Hook，用于在客户端和服务端上生成唯一 ID，避免 hydrate 不匹配。它主要用于组件库，这些库集成了需要唯一 ID 的可访问性 API。这解决了 React 17 及更低版本中已经存在的问题，但在 React
18 中更为重要，因为新的流式服务端渲染器对 HTML 的无序交付方式。

**useTransition**

useTransition 和 startTransition 让你把一些状态更新标记为不紧急。其他状态更新在默认情况下被认为是紧急的。React
将允许紧急的状态更新（例如，更新一个文本输入）中断非紧急的状态更新（例如，渲染一个搜索结果列表）。

**useDeferredValue**

useDeferredValue 让你推迟重新渲染树的非紧急部分。它类似于 debounce，但与之相比有一些优势。它没有固定的时间延迟，React 会在第一次渲染反映在屏幕后立即尝试延迟渲染。延迟渲染是可中断的，它不会阻塞用户输入。

**useSyncExternalStore**

useSyncExternalStore 是一个新的 Hook，它允许外部存储支持并发读取，通过强制更新到 store 以同步。在实现对外部数据源的订阅时，它消除了对 useEffect 的需求，并被推荐给任何与 React
外部状态集成的库。

**useInsertionEffect**

useInsertionEffect 是一个新的 Hook ，允许 CSS-in-JS 库解决在渲染中注入样式的性能问题。除非你已经建立了一个 CSS-in-JS 库，否则我们不希望你使用它。这个 Hook 将在 DOM 被变更后运行，但在
layout effect 读取新布局之前。这解决了一个在 React 17 及以下版本中已经存在的问题，但在 React 18 中更加重要，因为 React 在并发渲染时向浏览器让步，给它一个重新计算布局的机会。

### Concurrent Mode（并发模式）

Concurrent Mode（以下简称 CM）翻译叫并发模式，这个概念我们或许已经听过很多次了，实际上，在去年这个概念已经很成熟了，在 React 17 中就可以通过一些试验性的api开启 CM。

并发模式可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整，该模式通过使渲染可中断来修复阻塞渲染限制。在 Concurrent 模式中，React 可以同时更新多个状态。

说的太复杂可能有点拗口，总结一句话就是：**React 17 和 React 18 的区别就是：从同步不可中断更新变成了异步可中断更新。**

为了更好的管理root节点，React 18 引入了一个新的 root API，新的 root API 还支持 new concurrent renderer（并发模式的渲染），它允许你进入concurrent mode（并发模式）。

```jsx
// React 17
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root')
!;

ReactDOM.render(<App />, root);

// React 18
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root')
!;

ReactDOM.createRoot(root).render(<App />);
```

在 React 18 中，提供了新的 root api，我们只需要把 render 升级成 createRoot(root).render(<App />) 就可以开启并发模式了。

那么这个时候，可能有同学会提问：开启并发模式就是开启了并发更新么？

NO！ 在 React 17 中一些实验性功能里面，开启并发模式就是开启了并发更新，但是在 React 18 正式版发布后，由于官方策略调整，React 不再依赖并发模式开启并发更新了。

换句话说：**开启了并发模式，并不一定开启了并发更新！**

一句话总结：**在 18 中，不再有多种模式，而是以是否使用并发特性作为是否开启并发更新的依据。**

可以从架构角度来概括下，当前一共有两种架构：

- 采用不可中断的递归方式更新的 `Stack Reconciler`（老架构）
- 采用可中断的遍历方式更新的 `Fiber Reconciler`（新架构）

新架构可以选择是否开启并发更新，所以当前市面上所有 React 版本有四种情况：

- 老架构（v15及之前版本）
- 新架构，未开启并发更新，与情况1行为一致（v16、v17 默认属于这种情况）
- 新架构，未开启并发更新，但是启用了并发模式和一些新功能（比如 Automatic Batching，v18 默认属于这种情况）
- 新架构，开启并发模式，开启并发更新

**并发特性指开启并发模式后才能使用的特性**，比如：

- useDeferredValue
- useTransition

![1](https://foruda.gitee.com/images/1682007325938364918/c6174e9f_7819612.png)

#### startTransition 并发特性举例

这个新的 API 可以通过将特定更新标记为“过渡”来显著改善用户交互，简单来说，就是被 startTransition 回调包裹的 setState 触发的渲染被标记为不紧急渲染，这些渲染可能被其他紧急渲染所抢占。

```tsx
import React, { useState, useEffect, useTransition } from 'react';

const App: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    // 使用了并发特性，开启并发更新
    startTransition(() => {
      setList(new Array(10000).fill(null));
    });
  }, []);
  return (
    <>
      {list.map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </>
  );
};

export default App;
```

#### useDeferredValue 并发特性举例

从介绍上来看 useDeferredValue 与 useTransition 是否感觉很相似呢？

相同：useDeferredValue 本质上和内部实现与 useTransition 一样，都是标记成了延迟更新任务。 不同：useTransition 是把更新任务变成了延迟更新任务，而 useDeferredValue
是产生一个新的值，这个值作为延时状态。（一个用来包装方法，一个用来包装值）

所以，上面 startTransition 的例子，我们也可以用 useDeferredValue 来实现：

```jsx
import React, { useState, useEffect, useDeferredValue } from 'react';

const App: React.FC = () => {
  const [list, setList] = useState < any[] > ([]);
  useEffect(() => {
    setList(new Array(10000).fill(null));
  }, []);
  // 使用了并发特性，开启并发更新
  const deferredList = useDeferredValue(list);
  return (
    <>
      {deferredList.map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </>
  );
};

export default App;
```

此时我们的任务被拆分到每一帧不同的 task 中，JS脚本执行时间大体在5ms左右，这样浏览器就有剩余时间执行样式布局和样式绘制，减少掉帧的可能性。


### setState 自动批处理

React 18 通过在默认情况下执行批处理来实现了开箱即用的性能改进。

批处理是指为了获得更好的性能，在数据层，将多个状态更新批量处理，合并成一次更新（在视图层，将多个渲染合并成一次渲染）。

#### 在 React 18 之前：有一些情况下并不会合并更新

在React 18 之前，我们只在 React 事件处理函数 中进行批处理更新。默认情况下，在 `promise、setTimeout、原生事件处理函数中`、或任`何其它事件内`的更新都不会进行批处理：

**情况一：React 事件处理函数**

下面的代码就会批量处理，只会渲染一次页面

```typescript jsx
import React, { useState } from 'react';

// React 18 之前
const App: React.FC = () => {
  console.log('App组件渲染了！');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <button
      onClick={() => {
        setCount1(count => count + 1);
        setCount2(count => count + 1);
        // 在React事件中被批处理
      }}
    >
      {`count1 is ${count1}, count2 is ${count2}`}
    </button>
  );
};

export default App;
```

**情况二：setTimeout**

如果我们把状态的更新放在`promise`或者`setTimeout`里面， 组件都会渲染两次，不会进行批量更新。

```typescript jsx
import React, { useState } from 'react';

// React 18 之前
const App: React.FC = () => {
  console.log('App组件渲染了！');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <div
      onClick={() => {
        setTimeout(() => {
          setCount1(count => count + 1);
          setCount2(count => count + 1);
        });
        // 在 setTimeout 中不会进行批处理
      }}
    >
      <div>count1： {count1}</div>
      <div>count2： {count2}</div>
    </div>
  );
};

export default App;
```

**情况三：原生js事件**

在原生js事件中，结果跟情况二是一样的，每次点击更新两个状态，组件都会渲染两次，不会进行批量更新。

```typescript jsx
import React, { useEffect, useState } from 'react';

// React 18 之前
const App: React.FC = () => {
  console.log('App组件渲染了！');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  useEffect(() => {
    document.body.addEventListener('click', () => {
      setCount1(count => count + 1);
      setCount2(count => count + 1);
    });
    // 在原生js事件中不会进行批处理
  }, []);
  return (
    <>
      <div>count1： {count1}</div>
      <div>count2： {count2}</div>
    </>
  );
};

export default App;
```

#### 在 React 18 中: 合并更新

在 React 18 上面的三个例子只会有一次 render，因为所有的更新都将自动批处理。这样无疑是很好的提高了应用的整体性能。

不过以下例子会在 React 18 中执行两次 render：

```typescript jsx
import React, { useState } from 'react';

// React 18
const App: React.FC = () => {
  console.log('App组件渲染了！');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <div
      onClick={async () => {
        await setCount1(count => count + 1);
        setCount2(count => count + 1);
      }}
    >
      <div>count1： {count1}</div>
      <div>count2： {count2}</div>
    </div>
  );
};

export default App;
```

总结：

- 在 18 之前，只有在react事件处理函数中，才会自动执行批处理，其它情况会多次更新
- 在 18 之后，任何情况都会自动执行批处理，多次更新始终合并为一次

### flushSync

批处理是一个破坏性改动，如果你想退出批量更新，你可以使用 flushSync：

```typescript jsx
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

const App: React.FC = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <div
      onClick={() => {
        flushSync(() => {
          setCount1(count => count + 1);
        });
        // 第一次更新
        flushSync(() => {
          setCount2(count => count + 1);
        });
        // 第二次更新
      }}
    >
      <div>count1： {count1}</div>
      <div>count2： {count2}</div>
    </div>
  );
};

export default App;
```

### 其他

#### Suspense 不再需要 fallback 来捕获

空的 fallback 属性的处理方式做了改变：不再跳过 缺失值 或 值为null 的 fallback 的 Suspense 边界。

**更新前**

以前，如果你的 Suspense 组件没有提供 fallback 属性，React 就会悄悄跳过它，继续向上搜索下一个边界：

```jsx
// React 17
const App = () => {
  return (
    <Suspense fallback={<Loading />}> // <--- 这个边界被使用，显示 Loading 组件
      <Suspense> // <--- 这个边界被跳过，没有 fallback 属性
        <Page />
      </Suspense>
    </Suspense>
  );
};

export default App;
```

**更新后**

现在，React将使用当前组件的 Suspense 作为边界，即使当前组件的 Suspense 的值为 null 或 undefined：

```jsx
// React 18
const App = () => {
  return (
    <Suspense fallback={<Loading />}> // <--- 不使用
      <Suspense> // <--- 这个边界被使用，将 fallback 渲染为 null
        <Page />
      </Suspense>
    </Suspense>
  );
};

export default App;
```

#### 关于 React 组件的返回值

- 在 React 17 中，如果你需要返回一个空组件，React只允许返回null。如果你显式的返回了 undefined，控制台则会在运行时抛出一个错误。
- 在 React 18 中，不再检查因返回 undefined 而导致崩溃。既能返回 null，也能返回 undefined（但是 React 18 的dts文件还是会检查，只允许返回 null，你可以忽略这个类型错误）。

### 结论

- 并发更新的意义就是交替执行不同的任务，当预留的时间不够用时，React 将线程控制权交还给浏览器，等待下一帧时间到来，然后继续被中断的工作
- 并发模式是实现并发更新的基本前提
- 时间切片是实现并发更新的具体手段


### 参考文档

- https://zh-hans.legacy.reactjs.org/blog/2022/03/29/react-v18.html
- https://juejin.cn/post/7094037148088664078
- https://juejin.cn/post/7027995169211285512


## Comments / Answers

---

**yanlele** at 2023-07-23T03:37:02Z

补充参考文档
- [「React 深入」一文吃透React v18全部Api（1.3w+）](https://juejin.cn/post/7124486630483689485)
