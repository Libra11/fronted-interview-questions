# [webpack] webpack-dev-server 为何不适用于线上环境？【热度: 88】

- Issue: #655
- State: open
- Labels: 工程化, TOP100互联网
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/655
- Created: 2023-12-26T15:18:10Z
- Updated: 2023-12-26T15:18:10Z

## Body

**关键词**：webpack-dev-server 作用

webpack-dev-server并不适用于线上环境的原因有以下几点：

1. 性能问题：webpack-dev-server是一个开发服务器，它将编译后的文件保存在内存中，并提供给浏览器访问。这种方式在开发阶段可以提供快速的编译和热模块替换，但在线上环境中，内存中保存的文件无法持久化，每次启动服务器都需要重新编译和打包，这会影响性能，并且占用服务器资源。

2. 安全问题：webpack-dev-server并不进行代码压缩和混淆，源代码是以明文形式传输给浏览器的。这将使得攻击者可以很容易地获取到项目的源代码，从而可能导致安全漏洞。

3. 缺少文件输出：webpack-dev-server并没有生成最终的打包文件，它只是将打包后的文件保存在内存中，提供给浏览器访问。这样就无法进行资源的版本管理和持久化存储，无法做到长期的缓存和优化。

