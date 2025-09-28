# [Redux] 简单实现一下核心源码

- Issue: #241
- State: open
- Labels: web框架, 腾讯
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/241
- Created: 2023-04-02T14:46:40Z
- Updated: 2023-04-02T15:04:35Z

## Body

实现 Redux 的源码主要包括以下几个步骤：

1. 实现 createStore 函数，创建 store 对象，该函数接收一个 reducer 函数作为参数，返回一个对象。
2. 在 createStore 函数内部，定义一个 state 变量来存储当前的状态值，定义一个 listeners 数组来存储所有的监听函数。
3. 实现 getState 方法，返回当前的状态值。
4. 实现 dispatch 方法，接收一个 action 对象作为参数，将当前的状态值和 action 对象传给 reducer 函数，更新状态值。然后遍历 listeners 数组，调用所有的监听函数。
5. 实现 subscribe 方法，接收一个监听函数作为参数，将该函数添加到 listeners 数组中，以便在状态更新时调用。
6. 实现 combineReducers 函数，将多个 reducer 函数合并成一个 reducer 函数。
7. 在 createStore 函数内部，将传入的 reducer 函数或者合并后的 reducer 函数赋值给一个内部的 currentReducer 变量。
8. 在 dispatch 方法内部，将 currentReducer 赋值给一个局部变量，以保证在 reducer 函数中调用 dispatch 方法时可以获取到最新的 reducer 函数。

下面是代码实现：

```javascript
// 实现 createStore 函数
function createStore(reducer) {
  let state;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  dispatch({});

  return {
    getState,
    dispatch,
    subscribe
  };
}

// 实现 combineReducers 函数
function combineReducers(reducers) {
  return function(state = {}, action) {
    const nextState = {};
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  };
}
```

在使用时，可以先定义 reducer 函数：

```javascript
function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}

function visibilityFilter(state = "SHOW_ALL", action) {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
}
```

然后将它们传入 combineReducers 函数，创建一个 reducer 函数：

```javascript
const reducer = combineReducers({
  todos,
  visibilityFilter
});
```

最后调用 createStore 函数，创建一个 store 对象：

```javascript
const store = createStore(reducer);
```

现在就可以使用 store 对象来获取状态值、派发 action、监听状态变化了。


可以参考文档: https://juejin.cn/post/6844903785689546760
