# 介绍下深度优先遍历和广度优先遍历，如何实现？

深度优先遍历（Depth-First-Search，DFS）和广度优先遍历（Breadth-First-Search，BFS）是图和树的两种遍历方式。

### 深度优先遍历（DFS）

深度优先遍历采用深度优先的策略遍历整张图或树，即从当前节点开始，先访问其所有子节点，再依次访问子节点的子节点，直到遍历完整张图或树。

DFS 可以使用递归或栈来实现。

递归实现：

```javascript
function dfsRecursive(node, visited) {
  if (!node || visited.has(node)) {
    return;
  }
  visited.add(node);
  console.log(node.value);
  for (let i = 0; i < node.children.length; i++) {
    dfsRecursive(node.children[i], visited);
  }
}
```

栈实现：

```javascript
function dfsStack(node) {
  const visited = new Set();
  const stack = [node];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || visited.has(current)) {
      continue;
    }
    visited.add(current);
    console.log(current.value);
    for (let i = current.children.length - 1; i >= 0; i--) {
      stack.push(current.children[i]);
    }
  }
}
```

### 广度优先遍历（BFS）

广度优先遍历采用广度优先的策略遍历整张图或树，即从当前节点开始，先访问所有相邻节点，再访问所有相邻节点的相邻节点，以此类推，直到遍历完整张图或树。

BFS 可以使用队列来实现。

队列实现：

```javascript
function bfsQueue(node) {
  const visited = new Set();
  const queue = [node];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || visited.has(current)) {
      continue;
    }
    visited.add(current);
    console.log(current.value);
    for (let i = 0; i < current.children.length; i++) {
      queue.push(current.children[i]);
    }
  }
}
```

总的来说，深度优先遍历和广度优先遍历都有自己的应用场景，比如：

* 深度优先遍历通常用于寻找一条路径，或者对树的节点进行递归操作。
* 广度优先遍历通常用于寻找最短路径，或者对图进行层级遍历操作。