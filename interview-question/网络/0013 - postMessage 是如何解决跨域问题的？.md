# postMessage 是如何解决跨域问题的？

- Issue: #13
- State: open
- Labels: 网络
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/13
- Created: 2023-03-06T15:19:51Z
- Updated: 2023-03-06T15:19:52Z

## Body

## 基本概念

postMessage 是 HTML5 提供的一种跨窗口通信机制，可以在不同窗口、甚至不同域名之间进行通信，从而实现跨域通信。通过在一个窗口中调用 postMessage 方法向另一个窗口发送消息，接收窗口可以监听 message 事件，以接收发送过来的消息。

使用 postMessage 可以解决一些跨域问题，如在一个域名下的网页与其他域名下的网页进行通信。具体来说，当两个窗口的协议、主机名或端口不同时，就会发生跨域问题。但使用 postMessage 可以突破同源策略的限制，实现不同域之间的通信。

一般情况下，为了保证安全，使用 postMessage 进行跨域通信时，需要在目标窗口中设置 window.postMessage 的接收地址，只有来自该地址的消息才能被接收，从而避免了安全问题。同时，可以使用 origin 参数来限制消息来源，避免恶意攻击。

## 代码举例

假设我们有两个域名为 https://domain-a.com 和 https://domain-b.com 的网站，现在需要在这两个网站之间进行跨域通信。

在 https://domain-a.com 的页面中，我们可以使用以下代码向 https://domain-b.com 发送一条消息：

```js
const targetOrigin = "https://domain-b.com";
const message = "Hello, domain-b!";

window.parent.postMessage(message, targetOrigin);
```

这里的 window.parent 表示当前页面所在窗口的父级窗口，即指向 https://domain-a.com 的窗口对象。

在 https://domain-b.com 的页面中，我们可以使用以下代码监听消息并做出相应处理：
```js
window.addEventListener("message", event => {
  const origin = event.origin; // 发送消息的域名
  const data = event.data; // 消息内容

  if (origin === "https://domain-a.com") {
    console.log("Received message from domain-a:", data);
  }
});
```

使用 postMessage 进行跨域通信需要注意安全问题，特别是在确定目标域名时应该使用固定的字符串而不是动态生成的值，以避免被攻击者利用。

## iframe 是否可以使用 postMessage 通信？
不同的 iframe 和同一个页面之间也可以通过 postMessage 方法进行通信。这种情况下，通信的流程和同一页面中不同窗口的通信流程基本相同。只不过发送方和接收方不在同一页面中，而是在不同的 iframe 中。假设页面 A 中有两个 iframe，一个是 B 页面，另一个是 C 页面，现在需要在这两个 iframe 之间进行通信，具体的实现过程如下：

在 B 页面的脚本中使用 postMessage 方法向父级页面 A 发送消息：
```js
window.parent.postMessage('message from B', 'http://localhost:3000');
```

在 C 页面的脚本中使用 postMessage 方法向父级页面 A 发送消息：
```js
window.parent.postMessage('message from C', 'http://localhost:3000');
```

在页面 A 的脚本中监听 message 事件，接收来自不同 iframe 的消息：
```js
window.addEventListener('message', function(event) {
  // 判断消息来源是否是指定的 iframe
  if (event.origin === 'http://localhost:3000') {
    console.log('Received message: ' + event.data);
  }
});
```

需要注意的是，在这个过程中，B 和 C 两个 iframe 都需要和父级页面 A 都处于同一域名下，否则会触发跨域安全限制。

