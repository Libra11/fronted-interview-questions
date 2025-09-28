# 在 webpack 中，通常用于 css 提取的工具是什么？【热度: 269】

- Issue: #592
- State: open
- Labels: 工程化, 腾讯
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/592
- Created: 2023-10-05T03:10:58Z
- Updated: 2023-10-05T03:16:15Z

## Body

**关键词**：mini-css-extract-plugin作用、mini-css-extract-plugin使用

**概念**

在 webpack 中，通常使用 `mini-css-extract-plugin` 来提取 CSS。它是一个独立的插件，可以将 CSS 从 JavaScript 文件中提取出来，生成独立的 CSS 文件。
使用 `mini-css-extract-plugin` 可以优化代码分离和缓存，以及提高加载速度。

通过配置 webpack 的插件选项，可以将 `mini-css-extract-plugin` 添加到 webpack 构建流程中。在配置中，需要将该插件实例化，并指定输出的 CSS 文件名和路径。
一旦配置完成并运行 webpack 构建，`mini-css-extract-plugin` 就会将 CSS 提取到独立的文件中，而不是将其嵌入到 JavaScript 文件中。

示例代码如下：

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ...其他配置
  module: {
    rules: [
      // ...其他规则
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
```

在上述示例中，`MiniCssExtractPlugin.loader` 是用于提取 CSS 的 loader。`css-loader` 用于处理 CSS 文件的导入和解析。
`MiniCssExtractPlugin`则是插件实例，用于配置输出的 CSS 文件名。


**基本API使用**

下面是 `MiniCssExtractPlugin` 的常用参数及其说明：

| 参数名               | 类型     | 默认值       | 描述                                                                                                          |
| -------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| `filename`           | `string` | `[name].css` | 输出的 CSS 文件名，可以包含 `[name]`、`[id]`、`[contenthash]` 等占位符变量，用于生成唯一的文件名。            |
| `chunkFilename`      | `string` | `undefined`  | 输出的 CSS 文件名的 chunk 文件名，可以包含 `[name]`、`[id]`、`[contenthash]` 等占位符变量。                       |
| `ignoreOrder`        | `boolean` | `false`      | 是否忽略 CSS 导入顺序。                                                                                      |
| `insert`             | `function` &#124; `string` | `head`       | 用于指定 CSS 文件的插入位置。可以是字符串（`head`、`body`）或自定义函数。                                      |
| `publicPath`         | `string` | `undefined`  | 设置在 CSS 文件中使用的公共路径。                                                                              |
| `attributes`         | `object` | `{}`         | 附加到 `link` 标签的自定义属性。                                                                              |
| `chunkLoadTimeout`   | `number` | `120000`     | 加载 CSS chunk 的超时时间（毫秒）。                                                                           |
| `esModule`           | `boolean` | `true`       | 是否使用 ES modules 规范导出 CSS 模块。                                                                      |
| `experimentalUseImportModule` | `boolean` | `false` | 是否在导出 CSS 模块时使用 `import()` 函数。**此选项需要 webpack 5+ 才能使用。**                           |
| `hmr`                | `boolean` | `undefined`  | 是否启用模块热替换（Hot Module Replacement）。**此选项需要 webpack 5+ 才能使用。**                          |
| `ignoreOrder`        | `boolean` | `false`      | 是否忽略 CSS 导入顺序。                                                                                      |
| `minimize`           | `boolean` &#124; `object` | `true`       | 是否对提取的 CSS 进行压缩。可以通过传入一个对象来设置压缩的选项。使用 `cssnano` 进行 CSS 压缩。           |
| `sourceMap`          | `boolean` | `false`      | 是否生成 CSS 的 Source Map。                                                                                  |
| `moduleFilename`     | `function` | `(getAssetPath => `${path.relative(options.context, getAssetPath('css'))}`)` | 用于自定义生成的 CSS 文件路径和文件名的函数。 |
| `hot`                | `boolean` | `undefined`  | 是否启用热模块替换（Hot Module Replacement）。**此选项需要 webpack 4.46.0+ 才能使用。**                      |


