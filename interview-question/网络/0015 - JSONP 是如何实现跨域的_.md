# JSONP 是如何实现跨域的?

- Issue: #15
- State: open
- Labels: 网络
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/15
- Created: 2023-03-06T15:19:57Z
- Updated: 2023-03-06T15:19:58Z

## Body

## JSONP

JSONP 的实现原理是通过添加一个 script 标签，指定 src 属性为跨域请求的 URL，而这个 URL 返回的不是 JSON 数据，而是一段可执行的 JavaScript 代码，这段代码会调用一个指定的函数，并且将 JSON 数据作为参数传入函数中。

例如，假设我们从 http://example.com 域名下请求数据，我们可以通过在 http://example.com 中添加如下代码实现 JSONP 请求：

```js
function handleData(data) {
  // 处理获取到的数据
}

const script = document.createElement('script');
script.src = 'http://example.org/api/data?callback=handleData';
document.head.appendChild(script);
```

其中，我们指定了一个名为 `handleData` 的回调函数，并将这个函数名作为参数传递给了跨域请求的 URL 中的 callback 参数。服务器端返回的数据将会被包装在这个回调函数中，例如：
```js
handleData({"name": "John", "age": 30});
```

在这个例子中，我们可以在 handleData 函数中处理获取到的数据。需要注意的是，在使用 JSONP 时，**需要保证服务器端返回的数据是一个可执行的 JavaScript 代码，并且必须使用指定的回调函数名来包装数据，否则无法正确处理数据。**

### 如何获取 jsonp 的相应参数

获取 JSONP 响应结果的方法有两种，**一种是通过回调函数参数获取**，**另一种是通过 script 标签加载完成后解析全局变量获取**。

假设服务器返回以下 JSONP 响应：

```js
callback({"name": "Alice", "age": 20});
```

其中 callback 是客户端定义的回调函数名，用于指定返回数据的处理方式。

我们可以使用以下两种方式获取响应结果：

**1. 通过回调函数参数获取**
在客户端定义一个全局函数作为回调函数，服务器返回的数据会作为回调函数的参数传入，这个参数可以在回调函数中处理。
```js
function handleResponse(data) {
  console.log(data.name); // Alice
  console.log(data.age); // 20
}

// 创建 script 标签
const script = document.createElement('script');
script.src = 'http://example.com/api?callback=handleResponse';

// 插入到文档中开始加载数据
document.body.appendChild(script);
```

**2. 通过全局变量获取**
在客户端定义一个全局函数作为回调函数，服务器返回的数据会作为一个全局变量赋值给该函数所在的对象，我们可以在 script 标签加载完成后解析全局变量获取响应结果。
```js
function handleResponse() {
  console.log(myData.name); // Alice
  console.log(myData.age); // 20
}

// 创建 script 标签
const script = document.createElement('script');
script.src = 'http://example.com/api?callback=handleResponse';

// 插入到文档中开始加载数据
document.body.appendChild(script);

// script 标签加载完成后解析全局变量
window.myData = {};
script.onload = () => {
  delete window.myData; // 删除全局变量
};
```

注意，使用 JSONP 时要注意安全问题，应该对返回的数据进行验证，避免接收到恶意代码。此外，JSONP **只能发送 GET 请求**，无法发送 POST 请求，**也无法使用 HTTP 请求头和请求体传递数据**。


