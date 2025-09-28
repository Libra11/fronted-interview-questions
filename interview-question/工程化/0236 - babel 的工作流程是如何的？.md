# babel 的工作流程是如何的？

- Issue: #236
- State: open
- Labels: 工程化
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/236
- Created: 2023-03-29T15:37:34Z
- Updated: 2023-03-29T15:37:35Z

## Body

Babel 是一个 JavaScript 编译器，它的主要功能是将新版本的 JavaScript 代码转换成向后兼容的代码。Babel 的工作流程可以简单概括为以下几个步骤：

1. 解析：将 JavaScript 代码解析成 AST（抽象语法树）。

2. 转换：对 AST 进行遍历，进行代码转换。

3. 生成：将转换后的 AST 生成 JavaScript 代码。

具体来说，Babel 的工作流程如下：

1. Babel 使用 babylon 解析器将 JavaScript 代码解析成 AST，babylon 是一个基于 AST 的 JavaScript 解析器。

2. Babel 使用 babel-traverse 遍历器对 AST 进行遍历，找到需要转换的节点，进行转换。

3. Babel 使用 babel-core 转换器将 AST 转换成 JavaScript 代码。babel-core 是 babel 的核心模块，它包含了所有的转换器和插件。

4. Babel 使用 babel-generator 生成器将转换后的 AST 生成 JavaScript 代码。babel-generator 是一个将 AST 转换成 JavaScript 代码的工具。

在整个流程中，Babel 还会使用 babel-preset-env、babel-plugin-transform-runtime、babel-polyfill 等插件和工具来完成更加复杂的任务，如将 ES6 模块转换成 CommonJS 模块，使用 Polyfill 来实现一些新的 API 等。

需要注意的是，Babel 的转换过程是有损的，转换后的代码不一定与原始代码完全相同，也可能存在性能问题。因此，在使用 Babel 进行转换时，需要谨慎选择转换的规则和插件，以确保转换后的代码正确、高效。
