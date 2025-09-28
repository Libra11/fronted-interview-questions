# Protobuf 相关知识【热度: 216】

- Issue: #667
- State: open
- Labels: 网络, 阿里巴巴
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/667
- Created: 2024-01-12T16:04:54Z
- Updated: 2024-01-12T16:04:54Z

## Body

**关键词**：Protobuf 基本概念

`Protobuf（Protocol Buffers）`是由 Google 开发的一种轻量级、高效的数据交换格式，它被用于结构化数据的序列化、反序列化和传输。相比于 XML 和 JSON 等文本格式，Protobuf 具有更小的数据体积、更快的解析速度和更强的可扩展性。
Protobuf 的核心思想是使用协议（Protocol）来定义数据的结构和编码方式。使用 Protobuf，可以先定义数据的结构和各字段的类型、字段等信息，然后使用Protobuf提供的编译器生成对应的代码，用于序列化和反序列化数据。由于 Protobuf 是基于二进制编码的，因此可以在数据传输和存储中实现更高效的数据交换，同时也可以跨语言使用。

相比于 XML 和 JSON，Protobuf 有以下几个优势：

1. **可扩展性：** Protobuf 支持向已有的消息类型中添加新的字段，而不会破坏对旧数据的兼容性。这使得系统能够逐渐演进而不需要修改所有的代码。

2. **高效性：** 相对于一些文本格式的序列化（如XML和JSON），Protobuf 使用二进制格式，因此更为紧凑，更高效地进行数据存储和传输。

3. **语言中立：** Protobuf 支持多种编程语言，包括但不限于C++, Java, Python, Go等，这使得不同语言的系统能够使用相同的数据结构进行通信。

4. **自动代码生成：** Protobuf 通过使用 .proto 文件定义消息结构，然后利用相应语言的编译器生成与消息结构对应的代码。这简化了开发过程，减少了手动编写序列化和反序列化代码的工作。

5. **支持多种数据类型：** Protobuf 提供了丰富的基本数据类型，包括整数、浮点数、布尔值、字符串等，以及可以嵌套的消息类型，使得可以构建复杂的数据结构。

6. **适用于网络通信：** Protobuf 在网络通信领域广泛应用，特别是在 gRPC 中作为默认的消息序列化格式。

**可以参考文档**：https://zhuanlan.zhihu.com/p/141415216

