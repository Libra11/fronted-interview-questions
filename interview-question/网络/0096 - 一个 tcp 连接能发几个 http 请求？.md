# 一个 tcp 连接能发几个 http 请求？

- Issue: #96
- State: open
- Labels: 网络
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/96
- Created: 2023-03-14T14:52:22Z
- Updated: 2025-05-22T04:30:55Z

## Body

如果是 HTTP 1.0 版本协议，一般情况下，不支持长连接，因此在每次请求发送完毕之后，TCP 连接即会断开，因此一个 TCP 发送一个 HTTP 请求，但是有一种情况可以将一条 TCP 连接保持在活跃状态，那就是通过 Connection 和 Keep-Alive 首部，在请求头带上 Connection: Keep-Alive，并且可以通过 Keep-Alive 通用首部中指定的，用逗号分隔的选项调节 keep-alive 的行为，如果客户端和服务端都支持，那么其实也可以发送多条，不过此方式也有限制，可以关注《HTTP 权威指南》4.5.5 节对于 Keep-Alive 连接的限制和规则。

而如果是 HTTP 1.1 版本协议，支持了长连接，因此只要 TCP 连接不断开，便可以一直发送 HTTP 请求，持续不断，没有上限； 同样，如果是 HTTP 2.0 版本协议，支持多用复用，一个 TCP 连接是可以并发多个 HTTP 请求的，同样也是支持长连接，因此只要不断开 TCP 的连接，HTTP 请求数也是可以没有上限地持续发送


## Comments / Answers

---

**BruceYuj** at 2025-05-22T04:30:55Z

1. 对于 tcp 1.1 来讲，理论上可以在 keep-alive 下无限制发送 http 请求，但是实际上仍然受制于两点：
     - 服务器端配置
     - 客户端限制
 2. 对于 http/2 和 http/3，无限制
