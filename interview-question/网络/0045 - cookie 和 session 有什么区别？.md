# cookie 和 session 有什么区别？

- Issue: #45
- State: open
- Labels: 网络
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/45
- Created: 2023-03-09T15:31:46Z
- Updated: 2023-03-09T15:32:14Z

## Body

## cookie 和 session 有什么区别？


### 工作方式有所不同
Cookie和Session都是用来在Web应用程序中维护用户状态的机制，但是它们的工作方式有所不同：

**Cookie**：
Cookie是存储在用户计算机中的小文件，通常由Web服务器发送给Web浏览器。当用户在Web浏览器中发送请求时，浏览器会将Cookie发送回服务器，从而让服务器了解用户的状态信息。Cookie通常用于存储持久性数据，例如用户的首选项、购物车内容等。Cookie可以在Web浏览器中设置过期时间，一旦过期，它就不再有效。

**Session**：
Session是存储在服务器端的会话信息。当用户在Web浏览器中发送请求时，服务器会为每个会话创建一个唯一的标识符（Session ID），并将Session ID发送给Web浏览器。Web浏览器将Session ID存储在Cookie中（或者在URL参数中，如果Cookie不可用），然后将Session ID发送回服务器，从而让服务器知道用户的状态信息。Session通常用于存储短期数据，例如用户登录状态、购物车信息等。Session的数据会在一定时间内保持有效，一旦超过这个时间，数据就会被销毁。

总的来说，Cookie通常用于存储持久性数据，Session通常用于存储短期数据。Cookie存储在用户计算机中，Session存储在服务器端。另外，Cookie的安全性相对较差，因为Cookie中的数据可以被用户查看和修改，而Session的安全性相对较高，因为Session数据存储在服务器端，不容易被篡改。

### 还有啥区别？
除了上述提到的区别，Cookie和Session还有以下几个方面的区别：

存储位置：
Cookie数据存储在用户的浏览器中，而Session数据存储在服务器端的内存或者文件系统中。

安全性：
Cookie的数据可以被用户查看和修改，而Session数据存储在服务器端，对于客户端来说是不可见的，因此相对来说更加安全。

大小限制：
Cookie的大小通常受浏览器和操作系统的限制，一般不能超过4KB。而Session的大小没有明确的限制，可以存储大量的数据。

性能：
由于Session数据存储在服务器端，因此每次请求都需要从服务器端读取Session数据，对服务器造成了一定的负担，而Cookie数据存储在客户端，因此每次请求都不需要从服务器端读取数据，对服务器的负担相对较小。

总的来说，Cookie和Session都是常用的用于在Web应用程序中维护用户状态的机制，它们各自有其优点和缺点，需要根据具体应用场景选择合适的机制。


