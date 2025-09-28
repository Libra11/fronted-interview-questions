# package.json 配置了解多少？【热度: 747】

- Issue: #311
- State: open
- Labels: 工程化
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/311
- Created: 2023-04-26T14:13:01Z
- Updated: 2023-04-26T14:13:02Z

## Body

`package.json`常见配置分类：

- 描述配置

- 文件配置

- 脚本配置

- 依赖配置

- 发布配置

- 系统配置

- 第三方配置


`package.json` 作用：存储一切与项目相关的配置，例如项目基本信息、外界访问项目的方式、项目内置脚本、项目依赖等。

### 描述配置

主要是项目的基本信息，包括名称，版本，描述，仓库，作者等，部分会展示在 npm 官网上。

```js
{
  "name": "react", // 项目名称 or npm包名
  "version": "18.2.0", // 版本号，开源项目的版本号通常遵循 semver 语义化规范
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/react.git",
    "directory": "packages/react"
  }, // 项目的仓库地址及版本控制信息
  "description": "React is a JavaScript library for building user interfaces.", // 项目描述 (展示于 npm 官网)
  "keywords": [
    "ant",
    "component",
    "components",
    "design",
    "framework",
    "frontend",
    "react",
    "react-component",
    "ui"
  ], // 项目技术关键词
  "homepage": "https://reactjs.org/", // 项目的主页链接，通常是项目 github 链接，项目官网或文档首页
  "bugs": "https://github.com/vuejs/core/issues", // 项目 bug 反馈地址，通常是 github issue 页面的链接
  "author": "Li jiaxun", // 作者信息
  "private": true, // 私有项目, 若为 true 则无法发布到 npm 官网上
}
```



### 文件配置

包括项目所包含的文件，以及入口等信息。

```js
{
  // 🔥@files: 指定需要跟随一起发布的内容，控制 npm 包的大小。
  // 发布时默认会包括 package.json，license，README 和main 字段里指定的文件。忽略 node_modules，lockfile 等文件。在此基础上，可以指定更多需要一起发布的内容。(单独的文件/整个文件夹/使用通配符匹配到的文件)
  // 一般情况下，files 里会指定构建出来的产物以及类型文件，而 src，test 等目录下的文件不需要跟随发布。
  "files": [
    "filename.js",
    "directory/",
    "glob/*.{js,json}"
  ],
  // 🔥@type: 'module' => 用 ESM 解释 .js 文件(此时访问 CJS 模块文件需要 .cjs 后缀)；反之同理。
  "type": "module",
  // 🔥@main: 项目入口文件。
  // if "type: 'module'" => 指向 ESM 模块规范的项目入口文件 else => CommonJS 模块规范的项目入口文件。
  "main": "./index.cjs",
  // @browser: web端项目入口文件路径。该路径下文件不允许在 server 端使用。
  "browser": "./browser/index.js",
  // 🔥@module: ESM 规范模块的项目入口文件。
  "module": "./index.js",
  // 🔥@exports: 配置不同环境对应的模块入口文件(优先级最高 > main)。
  // 作用1: 以别名形式封装包的子路径。"import packageA/dist/css/index.css" => "import packageA/style"
  // 作用2: 以 '.' 为别名时，表示模块主入口，可以看做是 "mian"/"module" 等字段功能的集合。
  // 作用3: 设置模块访问权限。exports 限制使用者不可以访问未在"exports"中定义的任何其他路径。
  // 作用4: 提供了项目(包)多入口访问的途径。例如下面的 './docs' 和 './components'
  "exports": {
    ".": {
      "require": "./index.cjs",
      "import": "./index.js"
    },
    "./docs": {
      "require": "./docs/index.cjs",
      "import": "./docs/index.js"
    },
    "./components": {
      "require": "./components/index.cjs",
      "import": "./components/index.js"
    },
    "./style": "./dist/css/index.css'
  },
  // 🔥@workspaces: 项目的工作区配置，用于在本地的根目录下管理多个子项目。
  // 可以自动地在 npm install 时将 workspaces 下面的包，软链到根目录的 node_modules 中，不用手动执行 npm link 操作。
  // 通常子项目都会平铺管理在 packages 目录下，"packages/*" 表示将该路径下所有子项目的 node_modules 软链到根目录。
  "workspaces": [
    "packages/*",
  ],
}
```

> 当一个项目同时定义了 main，browser 和 module，像 webpack，rollup 等构建工具会感知这些字段，并会根据环境以及不同的模块规范来进行不同的入口文件查找。

#### `exports` 字段详解

参考 [阮一峰](https://es6.ruanyifeng.com/#docs/module-loader#package-json-%E7%9A%84-exports-%E5%AD%97%E6%AE%B5)

`exports`字段的优先级高于`main`字段。它有多种用法。

1. 子目录别名

`package.json`文件的`exports`字段可以指定脚本或子目录的别名，此时它的前缀的参照拼接路径是包名。

```js
// ./node_modules/es-module-package/package.json
{
 "exports": {
   "./submodule": "./src/submodule.js"
 }
}
```

上面的代码指定`src/submodule.js`别名为`submodule`，然后就可以从别名加载这个文件。

```js
import submodule from 'es-module-package/submodule';
// 加载 ./node_modules/es-module-package/src/submodule.js
```

如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。

```js
// 报错
import submodule from 'es-module-package/private-module.js';

// 不报错
import submodule from './node_modules/es-module-package/private-module.js';
```

2. main 的别名

`exports`字段的别名如果是`.`，就代表模块的主入口，优先级高于`main`字段，并且可以直接简写成`exports`字段的值。

```js
{
 "exports": {
   ".": "./main.js"
 }
}

// 等同于
{
 "exports": "./main.js"
}
```

由于`exports`字段只有支持 ES6 的 Node.js 才认识，所以可以同时添加`main`字段来兼容旧版本的 Node.js。

```
{
 "main": "./main-legacy.cjs",
 "exports": {
   ".": "./main-modern.cjs"
 }
}
```

> 上面代码中，老版本的 Node.js （不支持 ES6 模块）的入口文件是`main-legacy.cjs`，新版本的 Node.js 的入口文件是`main-modern.cjs`。

3. 条件加载

利用`.`这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。

```json
{
 "type": "module",
 "exports": {
   ".": {
     "require": "./main.cjs",
     "default": "./main.js"
   }
 }
}
```

> 上面代码中，别名`.`的`require`条件指定`require()`命令的入口文件（即 CommonJS 的入口），`default`条件指定其他情况的入口，此处配置了 `type: 'module'`，因此默认命中 ESM 模块规范。

### 脚本配置

```
{
  // npm run {scripts} / yarn {scripts} 等命令行方式启动预设置的脚本
  "scripts": {
    "build": "webpack"
  },
  // 设置 scripts 里的脚本在运行时的参数
  "config": {
    "port": "3001"
  },
}
```

### 依赖配置

项目依赖其他包引用的相关信息。
```js
{
  // 项目生产环境(运行时)下需要用到的依赖
  // 使用 npm install xxx 或则 npm install xxx --save 时，会被自动插入到该字段中。
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  // 项目开发环境需要用到而运行时不需要的依赖，用于辅助开发
  // 使用 npm install xxx -D 或者 npm install xxx --save-dev 时，会被自动插入到该字段中。
  "devDependencies": {
    "webpack": "^5.69.0"
  },
  // 同伴依赖
  // 一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者。
  // 比如我们安装 A，A 的正常使用依赖 B@2.x 版本，那么 B@2.x 就应该被列在 A 的 peerDependencies 下，表示“如果你使用我，那么你也需要安装 B，并且至少是 2.x 版本”。
  // 比如 React 组件库 Ant Design，它的 package.json 里 peerDependencies 为
  // 表示如果你使用 Ant Design，那么你的项目也应该安装 react 和 react-dom，并且版本需要大于等于 16.9.0。
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  },
  // optionalDependencies
  // 可选依赖，顾名思义，表示依赖是可选的，它不会阻塞主功能的使用，安装或者引入失败也无妨。这类依赖如果安装失败，那么 npm 的整个安装过程也是成功的。
  // 比如我们使用 colors 这个包来对 console.log 打印的信息进行着色来增强和区分提示，但它并不是必需的，所以可以将其加入到 optionalDependencies，并且在运行时处理引入失败的逻辑。
  // 使用 npm install xxx -O 或者 npm install xxx --save-optional 时，依赖会被自动插入到该字段中。
  "optionalDependencies": {
    "colors": "^1.4.0"
  },
  // peerDependenciesMeta
  // 同伴依赖也可以使用 peerDependenciesMeta 将其指定为可选的。
  "peerDependencies": {
    "colors": "^1.4.0"
  },
  "peerDependenciesMeta": {
    "colors": {
      "optional": true
    }
  },
  // bundleDependencies
  // 打包依赖。它的值是一个数组，在发布包时，bundleDependencies 里面的依赖都会被一起打包。
  // 比如指定 react 和 react-dom 为打包依赖：
  // 在执行 npm pack 打包生成 tgz 压缩包中，将出现 node_modules 并包含 react 和 react-dom。
  // 需要注意的是，这个字段数组中的值必须是在 dependencies，devDependencies 两个里面声明过的依赖才行。
  // 普通依赖通常从 npm registry 安装，但当你想用一个不在 npm registry 里的包，或者一个被修改过的第三方包时，打包依赖会比普通依赖更好用。
  "bundleDependencies": [
    "react",
    "react-dom"
  ],
  // overrides
  // overrides 可以重写项目依赖的依赖，及其依赖树下某个依赖的版本号，进行包的替换。
  // 比如某个依赖 A，由于一些原因它依赖的包 foo@1.0.0 需要替换，我们可以使用 overrides 修改 foo 的版本号：
  "overrides": {
    "foo": "1.1.0-patch"
  }
}
```

### 发布配置
主要是和项目发布相关的配置。

**private**

如果是私有项目，不希望发布到公共 npm 仓库上，可以将 `private` 设为 true。
```
"private": true
```

**publishConfig**

顾名思义，publishConfig 就是 npm 包发布时使用的配置。

比如在安装依赖时指定了 registry 为 taobao 镜像源，但发布时希望在公网发布，就可以指定 publishConfig.registry。

```
"publishConfig": {
  "registry": "https://registry.npmjs.org/"
}
```


### 系统配置

和项目关联的系统配置，比如 node 版本或操作系统兼容性之类。这些要求只会起到提示警告的作用，即使用户的环境不符合要求，也不影响安装依赖包。

**engines**

一些项目由于兼容性问题会对 node 或者包管理器有特定的版本号要求，比如：

```
"engines": {
  "node": ">=14 <16",
  "pnpm": ">7"
}
```
要求 node 版本大于等于 14 且小于 16，同时 pnpm 版本号需要大于 7。


**os**

在 linux 上能正常运行的项目可能在 windows 上会出现异常，使用 os 字段可以指定项目对操作系统的兼容性要求。

```
"os": ["darwin", "linux"]
```

**cpu**

指定项目只能在特定的 CPU 体系上运行。

```
"cpu": ["x64", "ia32"]
```




### 第三方配置

一些第三方库或应用在进行某些内部处理时会依赖这些字段，使用它们时需要安装对应的第三方库。

```js
{
  // 其他工具访问本项目 ts 类型定义时的入口文件
  "types": "./index.d.ts",
  // npm 上所有的文件都开启 CDN 服务
  "unpkg": "dist/vue.global.js",
  // 设置项目的浏览器兼容情况, babel 和 autoprefixer 等工具会使用该配置对代码进行转换
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ],
  // 用于 webpack 的 tree-shaking 优化, 指定路径下的文件不参与 tree-shaking 并始终保留。
  "sideEffects": [
    "dist/*",
    "es/**/style/*",
    "lib/**/style/*",
    "*.less"
  ]
}
```


### 参考文档
- https://juejin.cn/post/7145001740696289317
- https://juejin.cn/post/7161392772665540644

