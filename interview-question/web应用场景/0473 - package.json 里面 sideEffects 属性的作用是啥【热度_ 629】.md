# package.json 里面 sideEffects 属性的作用是啥【热度: 629】

- Issue: #473
- State: open
- Labels: web应用场景, 京东
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/473
- Created: 2023-07-06T14:25:20Z
- Updated: 2023-07-06T14:25:33Z

## Body

**关键词**：sideEffects作用、package.json sideEffects 属性、webpack Tree Shaking 优化、Tree Shaking 优化

### sideEffects 作用

`sideEffects`是`package.json`文件中的一个字段，它用于指定一个模块是否具有副作用。副作用是指模块在加载时会执行一些特定的操作，而不仅仅是导出一个函数或对象。

`sideEffects`字段可以有以下几种取值：

- `true`：表示模块具有副作用，即模块加载时会执行一些操作。这是默认值，如果没有在`package.json`中明确指定`sideEffects`字段，则假设为`true`。
- `false`：表示模块没有副作用，即模块加载时不会执行任何操作。这意味着该模块只导出函数、对象或其他静态内容，并且不依赖于其他模块的副作用。
- 数组：可以将模块的具体文件路径或文件匹配模式（使用glob模式）列在数组中，以指定哪些文件具有副作用，哪些文件没有副作用。例如，`["./src/*.js", "!./src/utils/*.js"]`表示`src`目录下的所有`.js`文件都具有副作用，但是`src/utils`目录下的`.js`文件没有副作用。

使用`sideEffects`字段可以帮助构建工具（如Webpack）进行优化。如果模块没有副作用，构建工具可以进行更好的摇树优化（tree shaking），即只保留项目所需的代码，而将未使用的代码消除，从而减小最终打包文件的大小。

注意：在使用`sideEffects`字段时，需要确保你的代码确实没有副作用，否则可能会导致意外的行为。

### sideEffects 是如何辅助 webpack 进行优化的？

`sideEffects`字段可以帮助Webpack进行摇树优化（Tree Shaking），从而减小最终打包文件的大小。摇树优化是指只保留项目所需的代码，而将未使用的代码消除。

当Webpack打包时，它会通过静态分析来确定哪些导入的模块实际上被使用了，然后只保留这些被使用的代码，并将未使用的代码从最终的打包文件中删除。

在这个过程中，Webpack会检查模块的`sideEffects`字段。如果一个模块具有`sideEffects`字段，并且设置为`false`，Webpack会认为该模块没有副作用。Webpack会在摇树优化过程中将未使用的导出从该模块中删除，因为它不会影响项目的功能。

然而，如果一个模块具有`sideEffects`字段，并且设置为`true`或是一个数组，Webpack会认为该模块具有副作用。在摇树优化过程中，Webpack会保留该模块的所有导出，因为它不能确定哪些代码是副作用的。这样可以确保项目中需要的副作用代码不会被误删除。

因此，通过正确使用`sideEffects`字段，可以帮助Webpack更好地优化打包文件，减少不必要的代码，提高应用程序的性能。

