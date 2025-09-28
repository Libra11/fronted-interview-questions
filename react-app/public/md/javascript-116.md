# React Diff算法是怎么实现的？

### 原理
React 中的 Diff 算法，是用于比较新旧两个虚拟 DOM 树，找出需要更新的节点并进行更新的算法。React 的 Diff 算法实现基于以下假设：

1. 两个不同类型的元素会产生不同的树形结构。
2. 对于同一层级的一组子节点，它们可以通过唯一 id 匹配到相同的节点。
3. 每个组件都有一个唯一标识符 key。

基于以上假设，React 的 Diff 算法分为两个阶段：

1. `O(n)` 的遍历，对比新旧两棵树的每一个节点，并记录节点的变更。在这个过程中，React 使用了双端队列（Double-ended queue）作为辅助数据结构，以保证遍历的高效性。
2. `O(k)` 的反向遍历，根据记录的变更列表对 DOM 进行更新。

在第一阶段中，React 的 Diff 算法会从两棵树的根节点开始，依次对比它们的子节点。如果某个节点在新旧两个树中都存在，那么就将其进行更新。如果新树中有新节点，那么就将其插入到旧树中对应的位置。如果旧树中有节点不存在于新树中，那么就将其从 DOM 树中移除。

在第二阶段中，React 会根据记录的变更列表对 DOM 进行更新。这个过程中，React 会按照更新的优先级进行更新，优先更新需要移动的节点，其次更新需要删除的节点，最后再更新需要插入的节点。

需要注意的是，React 的 Diff 算法并不保证一定找到最优解，但是它保证了在大多数情况下，找到的解都是比较优的。同时，React 的 Diff 算法也具有一定的限制，比如无法跨越组件边界进行优化，这也是 React 中尽量避免多层嵌套组件的原因之一。

### 代码模拟实现
React diff算法是一种优化算法，用于比较两个虚拟DOM树的差异，以最小化DOM操作的数量，从而提高渲染性能。
以下是一个简单的实现React diff算法的代码：
```js
function diff(oldTree, newTree) {
  const patches = {};
  let index = 0;
  walk(oldTree, newTree, index, patches);
  return patches;
}

function walk(oldNode, newNode, index, patches) {
  const currentPatch = [];

  if (!newNode) {
    currentPatch.push({ type: "REMOVE" });
  } else if (typeof oldNode === "string" && typeof newNode === "string") {
    if (oldNode !== newNode) {
      currentPatch.push({ type: "TEXT", content: newNode });
    }
  } else if (oldNode.type === newNode.type) {
    const attrs = diffAttrs(oldNode.props, newNode.props);
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({ type: "ATTRS", attrs });
    }
    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
  } else {
    currentPatch.push({ type: "REPLACE", newNode });
  }

  if (currentPatch.length > 0) {
    patches[index] = currentPatch;
  }
}

function diffAttrs(oldAttrs, newAttrs) {
  const attrs = {};
  for (const key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      attrs[key] = newAttrs[key];
    }
  }
  for (const key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      attrs[key] = newAttrs[key];
    }
  }
  return attrs;
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  const diffs = listDiff(oldChildren, newChildren, "key");
  newChildren = diffs.children;

  if (diffs.moves.length > 0) {
    const reorderPatch = { type: "REORDER", moves: diffs.moves };
    currentPatch.push(reorderPatch);
  }

  let lastIndex = index;
  oldChildren.forEach((child, i) => {
    const newChild = newChildren[i];
    index = lastIndex + 1;
    walk(child, newChild, index, patches);
    lastIndex = index;
  });
}

function listDiff(oldList, newList, key) {
  const oldMap = makeKeyIndexAndFree(oldList, key);
  const newMap = makeKeyIndexAndFree(newList, key);

  const newFree = newMap.free;

  const moves = [];

  const children = [];
  let i = 0;
  let item;
  let itemIndex;
  let freeIndex = 0;

  while (i < oldList.length) {
    item = oldList[i];
    itemIndex = oldMap.keyIndex[item[key]];
    if (itemIndex === undefined) {
      moves.push({ index: i, type: "REMOVE" });
    } else {
      children.push(newList[itemIndex]);
      if (itemIndex >= freeIndex) {
        freeIndex = itemIndex + 1;
      } else {
        moves.push({ index: itemIndex, type: "INSERT", item: item });
      }
    }
    i++;
  }

  const remaining = newFree.slice(freeIndex);
  remaining.forEach(item => {
    moves.push({ index: newList.indexOf(item), type: "INSERT", item: item });
  });

  return { moves, children };
}

function makeKeyIndexAndFree(list, key) {
  const keyIndex = {};
  const free = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item[key] !== undefined) {
      keyIndex[item[key]] = i;
    } else {
      free.push(item);
    }
  }
  return { keyIndex, free };
}
```