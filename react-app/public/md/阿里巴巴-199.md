# 手写 观察者模式

观察者模式（又称发布-订阅模式）是一种行为型设计模式，它定义了对象之间的一对多依赖关系，使得当一个对象的状态发生改变时，其相关的依赖对象都能够得到通知并被自动更新。

在 JavaScript 中实现观察者模式，可以分为以下几个步骤：

1. 创建一个主题对象（Subject），用来存储观察者对象，并提供添加、删除、通知观察者的接口。

2. 创建观察者对象（Observer），它有一个 update 方法，用来接收主题对象的通知，并进行相应的处理。

下面是一个简单的示例：

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 删除观察者
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // 通知观察者
  notifyObservers() {
    this.observers.forEach(observer => observer.update());
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update() {
    console.log(`${this.name} received the notification.`);
  }
}

const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notifyObservers();
// Output:
// Observer 1 received the notification.
// Observer 2 received the notification.
```

在这个示例中，Subject 是主题对象，Observer 是观察者对象。Subject 提供了添加、删除、通知观察者的接口，Observer 有一个 update 方法，用来接收主题对象的通知，并进行相应的处理。在使用时，我们可以通过调用 Subject 的 addObserver 方法，将 Observer 对象添加到主题对象中。当主题对象的状态发生改变时，我们可以调用 notifyObservers 方法，通知所有的观察者对象进行更新。

以上仅是一个简单的示例，实际应用中还需要考虑更多的细节问题。