# [Webpack] 为何不支持 CMD 模块化【热度: 255】

- Issue: #761
- State: open
- Labels: 工程化, TOP100互联网
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/761
- Created: 2024-05-26T01:39:45Z
- Updated: 2024-05-26T01:39:46Z

## Body

**关键词**：webpack 模块化支持

> 作者总结一下原因：
>
> 1. CMD 是国内产品， webpack 是国外产品， 而且 CMD 还没有火起来的时候， 就已经被 ESM 替代了
> 2. CMD 是更加懒惰，是依赖就近，延迟执行。也就是说，在模块中需要用到依赖时，才去引入依赖。这和 Webpack 的理念以及模块收集和打包机制不兼容

CMD（Common Module Definition）是一种深受国内前端开发者喜爱的模块定义规范，主要被用在了 Sea.js 这个模块加载器中。CMD 是国内开发者提出的规范，它和 AMD 很相似，但是更符合国内开发者的习惯，需要时可以延迟执行。

Webpack 本身是围绕 NPM 生态和标准化模块格式（如 ES Modules 和 CommonJS）构建的，而 NPM 生态主要使用的是 CommonJS 形式。因此，对于大多数使用 NPM 之 Webpack 的用户来说，这些就足够用了。而 ES Modules 作为 JavaScript 官方的模块系统标准，越来越多地在现代应用中被采用。

面对 CMD，Webpack 的社区并没有广泛地采用或者需要支持这种模块定义。CMD 在模块定义时依赖于具体的 API 和加载时机，这和 Webpack 的理念以及模块收集和打包机制不完全兼容。Webpack 鼓励在编译时就确定模块依赖，而 CMD 更倾向于运行时动态确定。

尽管如此，理论上是可以通过一些插件或 loader 来实现对 CMD 模块的支持的，但是官方并没有集成这样的功能，因为需求没有那么大，同时现有的模块加载机制已经可以满足绝大多数场景的需要。随着前端工程化的深入，标准化的模块定义（如 ES Modules）更加受到青睐，而特定的模块定义（如 CMD）则逐渐被边缘化。因此，Webpack 没有默认支持 CMD，也反映了当前前端模块化开发的趋势和实践。

