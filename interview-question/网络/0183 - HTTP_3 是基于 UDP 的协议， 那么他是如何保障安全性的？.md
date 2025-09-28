# HTTP/3 是基于 UDP 的协议， 那么他是如何保障安全性的？

- Issue: #183
- State: open
- Labels: 网络
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/183
- Created: 2023-03-26T09:18:32Z
- Updated: 2024-07-05T09:52:10Z

## Body

HTTP/3是基于UDP的协议，因此在设计时需要考虑安全性问题。为了保障安全性，HTTP/3使用了一个新的加密协议——QUIC Crypto。

QUIC Crypto使用了一种名为"0-RTT安全连接"的机制，允许客户端在第一次请求时就可以建立安全连接，从而减少连接建立的延迟。此外，HTTP/3还使用了数字证书来验证服务器身份，以确保通信的安全性。

在HTTP/3中，每个数据包都使用一个独特的标识符（Connection ID）来标识。这个标识符会在每个数据包中包含，以便服务器能够识别它们。这种方式可以防止攻击者进行连接欺骗，从而提高了安全性。

另外，HTTP/3还使用了一些其他的技术来提高安全性，如0-RTT加密、零轮延迟、源地址验证、密钥派生和更新等。

综上所述，HTTP/3采用了一系列安全机制来保护通信安全，使其能够在基于UDP的网络环境下运行，并提供更好的性能和安全性。

## Comments / Answers

---

**liam61** at 2024-07-05T09:52:09Z

udp 在得到连接确认，就是安全的
