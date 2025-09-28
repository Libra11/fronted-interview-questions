# [React] hooks 调用是可以写在 if 语句里面吗【热度: 337】

- Issue: #807
- State: open
- Labels: web框架, 腾讯
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/807
- Created: 2024-08-10T02:32:59Z
- Updated: 2024-08-10T02:32:59Z

## Body

**关键词**：hooks 调用问题

**hooks 写在 if 语句里面， 也是可以执行的， 但是会带来很多不可预期的异常**

在 React 中，Hooks 的调用不应该直接写在 `if` 语句里面。

Hooks 必须在函数组件的顶层（不在循环、条件判断或嵌套函数中）按顺序调用。这是因为 React 需要在每次渲染时以相同的顺序调用 Hooks，以正确管理组件的状态和副作用。

如果在 `if` 语句中调用 Hooks，可能会导致以下错误：

1. 状态不一致：由于渲染顺序的不确定性，可能会导致状态的更新和获取出现不一致的情况。

2. 难以预测的行为：React 依赖于 Hooks 的调用顺序来正确管理组件的内部逻辑，如果在条件语句中调用，可能会导致难以理解和调试的问题。

例如，下面的代码是错误的：

```jsx
function MyComponent() {
  if (someCondition) {
    const [count, setCount] = useState(0); // 错误：不允许在条件语句中调用 useState
  }

  // 后续代码
}
```

为了遵循规则，应该将 Hooks 的调用始终保持在函数组件的最顶层。

