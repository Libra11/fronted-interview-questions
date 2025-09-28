# 实现一个双向链表， 具备添加节点、删除节点、在特定位置插入节点、查找节点、遍历等功能

# 必须要掌握的知识
在 JavaScript 中实现双向链表需要掌握以下知识点：

- 如何使用构造函数和类创建双向链表节点，以及如何在节点之间建立双向连接。

- 双向链表的常用操作，包括`添加节点、删除节点、在特定位置插入节点、查找节点`等。

- 双向链表的遍历和迭代，包括`正向遍历、反向遍历、循环遍历`等。

- 链表的常见问题，例如`链表是否为空、链表长度、查找节点`等。

- 对 JavaScript 垃圾回收机制的理解，确保双向链表的实现不会导致内存泄漏。

以上知识点是实现双向链表所必须掌握的内容，掌握这些知识点能够帮助我们有效地创建和操作双向链表。

## 什么是双向链表

双向链表（Doubly linked list）是一种常见的数据结构，它是由一系列节点组成的，每个节点都包含一个指向前驱节点和后继节点的指针。相比单向链表，双向链表具有双向遍历的能力，即可以从任意一个节点开始，向前或向后遍历整个链表。

双向链表的每个节点通常包含两个指针，即 prev 指针和 next 指针。prev 指针指向当前节点的前驱节点，而 next 指针指向当前节点的后继节点。由于每个节点都包含两个指针，因此双向链表的节点通常比单向链表的节点更占用空间。

双向链表可以用于实现各种数据结构和算法，如LRU（Least Recently Used）缓存淘汰算法，双向队列（Deque）等。由于它具有双向遍历的能力，因此在某些场景下可以比单向链表更加高效和方便。


## 实现一个双向链表
```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 在链表末尾添加节点
  push(value) {
    const node = new Node(value);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  // 从链表末尾移除节点
  pop() {
    if (this.length === 0) {
      return undefined;
    }
    const node = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = node.prev;
      this.tail.next = null;
      node.prev = null;
    }
    this.length--;
    return node.value;
  }

  // 在链表开头添加节点
  unshift(value) {
    const node = new Node(value);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  // 从链表开头移除节点
  shift() {
    if (this.length === 0) {
      return undefined;
    }
    const node = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = node.next;
      this.head.prev = null;
      node.next = null;
    }
    this.length--;
    return node.value;
  }

  // 获取指定位置的节点
  get(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }
    let node = null;
    if (index < this.length / 2) {
      node = this.head;
      for (let i = 0; i < index; i++) {
        node = node.next;
      }
    } else {
      node = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        node = node.prev;
      }
    }
    return node;
  }

  // 在指定位置插入节点
  insert(index, value) {
    if (index < 0 || index > this.length) {
      return false;
    }
    if (index === 0) {
      return !!this.unshift(value);
    }
    if (index === this.length) {
      return !!this.push(value);
    }
    const node = new Node(value);
    const prevNode = this.get(index - 1);
    const nextNode = prevNode.next;
    prevNode.next = node;
    node.prev = prevNode;
    node.next = nextNode;
    nextNode.prev = node;
    this.length++;
    return true;
  }

  // 移除指定位置的节点
  remove(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }
    if (index === 0) {
      return this.shift();
    }
    if (index === this.length - 1) {
      return this.pop();
    }
    const nodeToRemove = this.get(index);
    const prevNode = nodeToRemove.prev;
    const nextNode = nodeToRemove.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    nodeToRemove.next = null;
    nodeToRemove.prev = null;
    this.length--;
    return nodeToRemove.value;
  }

  // 反转链表
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prevNode = null;
    let nextNode = null;
    for (let i = 0; i < this.length; i++) {
      nextNode = node.next;
      node.next = prevNode;
      node.prev = nextNode;
      prevNode = node;
      node = nextNode;
    }
    return this;
  }

  // 通过 value 来查询 index
  findIndexByValue(value) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (currentNode.value === value) {
        return index;
      }
      currentNode = currentNode.next;
      index++;
    }

    return -1; // 如果链表中没有找到该值，返回 -1
  }

  // 正向遍历链表，并返回遍历结果
  forwardTraversal() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  // 反向遍历链表，并返回遍历结果
  backwardTraversal() {
    const result = [];
    let current = this.tail;
    while (current) {
      result.push(current.value);
      current = current.prev;
    }
    return result;
  }

  // 循环遍历链表，并返回遍历结果
  loopTraversal() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
      if (current === this.head) {
        break;
      }
    }
    return result;
  }
}
```