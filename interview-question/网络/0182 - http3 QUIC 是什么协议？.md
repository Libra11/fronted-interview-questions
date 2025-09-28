# http3 QUIC 是什么协议？

- Issue: #182
- State: open
- Labels: 网络
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/182
- Created: 2023-03-26T09:13:35Z
- Updated: 2023-03-26T09:13:40Z

## Body

HTTP/3（或称为HTTP-over-QUIC）是一个基于QUIC协议的新版本的HTTP协议。QUIC（Quick UDP Internet Connections）是由Google设计的一个基于UDP协议的传输层协议，旨在解决HTTP/2协议存在的一些问题。

HTTP/3中引入了QUIC的一些特性，如0-RTT连接建立、基于UDP的传输、数据流多路复用和快速恢复等，这些特性有助于提高性能和安全性。与HTTP/2相比，HTTP/3采用了新的二进制编码协议（QUIC Crypto）来加密和验证数据，以提供更好的安全性。

此外，HTTP/3还可以更好地适应现代网络环境下的多元化应用需求。由于QUIC协议基于UDP协议，因此可以更好地适应移动网络和高丢包率网络等不稳定的网络环境。同时，HTTP/3可以更好地支持多媒体内容和实时通信等应用场景。
