# 说一说 cookie sessionStorage localStorage 区别？

- Issue: #104
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/104
- Created: 2023-03-15T13:38:33Z
- Updated: 2024-12-17T03:24:14Z

## Body

cookie、sessionStorage和localStorage都是存储在浏览器端的客户端存储方式，用于存储一些客户端数据。

它们之间的区别如下：

1. 生命周期

cookie的生命周期由Expires和Max-Age两个属性控制。当设置了Expires属性时，cookie的生命周期为设置的过期时间；当设置了Max-Age属性时，cookie的生命周期为设置的秒数。cookie在浏览器关闭时也会过期。而sessionStorage和localStorage的生命周期则与浏览器窗口相关，当窗口被关闭时，sessionStorage数据也会被清空，而localStorage数据则会一直存在，直到用户手动删除。

2. 存储容量

cookie的存储容量限制为4KB，而sessionStorage和localStorage的存储容量则较大，可以达到5MB或更高。

3. 数据共享

cookie可以被所有同源窗口（指协议、域名、端口相同）访问，而sessionStorage和localStorage只能被创建它们的窗口访问。

4. 传输方式

cookie会随着http请求发送到服务器，而sessionStorage和localStorage不会发送到服务器，只存在于浏览器端。

5. 数据类型

cookie只能存储字符串类型的数据，而sessionStorage和localStorage可以存储除了对象以外的数据类型，如数字、布尔值、数组、甚至是其他复杂的数据结构。但是，它们都可以通过JSON.stringify和JSON.parse方法将数据转化为字符串进行存储和读取。

综上所述，这三种存储方式都有各自的优缺点和适用场景。在实际应用中，我们需要根据实际情况选择合适的存储方式。

## Comments / Answers

---

**pp-show** at 2024-12-17T03:22:14Z

sessionStorage和localStorage只能被创建它们的窗口访问 这句话有问题sessionStorage 只能被创建他们的窗口访问，localStorage 是同源都可以访问的

---

**pp-show** at 2024-12-17T03:24:13Z

Cookie、localStorage 和 sessionStorage 都只能存储字符串类型的数据 数据类型也说错了

