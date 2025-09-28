# [webpack] module、chunk 、bundle 的区别【热度: 136】

- Issue: #309
- State: open
- Labels: 工程化
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/309
- Created: 2023-04-26T13:01:07Z
- Updated: 2023-04-26T13:02:02Z

## Body

首先上图：                       
![3 (1)](https://user-images.githubusercontent.com/22188674/234582993-25c40cda-d3ee-4f96-b134-44a950aba11f.png)


- 手写下一个一个的文件，它们无论是 `ESM` 还是 `commonJS` 或是 `AMD`，他们都是 `module`
- 当我们写的 `module` 源文件传到 `webpack` 进行打包时，`webpack` 会根据文件引用关系生成 `chunk` 文件，`webpack` 会对这个 `chunk` 文件进行一些操作
- webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，可以直接在浏览器中运行。

一般来说一个 chunk 对应一个 bundle，比如上图中的 `utils.js -> chunks 1 -> utils.bundle.js`

但也有例外，比如说上图中，我就用 `MiniCssExtractPlugin` 从 chunks 0 中抽离出了 `index.bundle.css` 文件

**总结**：                     
module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：                                 
我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。                  

