# fetch 与 ajax 的区别是什么

- Issue: #403
- State: open
- Labels: 网络
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/403
- Created: 2023-06-02T16:17:40Z
- Updated: 2023-06-02T16:17:41Z

## Body

以下是 Fetch API 与传统的 Ajax（XMLHttpRequest）在几个方面的对比：

| 维度         | Fetch API                                                      | Ajax (XMLHttpRequest)                                        |
| ------------ | -------------------------------------------------------------- | ------------------------------------------------------------ |
| API          | 提供了更现代化的 API，使用 `fetch()` 方法进行请求                 | 使用 `XMLHttpRequest` 对象进行请求                           |
| 语法         | 基于 Promise，使用链式调用方式进行请求和处理响应                   | 使用回调函数方式处理请求和响应                               |
| 跨域支持     | 默认情况下，不发送跨域请求，可以使用 CORS 进行跨域请求           | 可以发送跨域请求，但受到同源策略的限制                       |
| 请求类型     | 支持多种请求类型，如 GET、POST、PUT、DELETE 等                   | 支持多种请求类型，如 GET、POST、PUT、DELETE 等               |
| 请求头       | 使用 `Headers` 对象设置请求头                                   | 使用 `setRequestHeader()` 方法设置请求头                    |
| 请求体       | 可以直接使用 `FormData`、`Blob`、`URLSearchParams` 等作为请求体  | 可以使用字符串或 `FormData` 对象作为请求体                    |
| 取消请求     | 支持使用 `AbortController` 和 `AbortSignal` 取消请求             | 需要手动处理取消请求，如终止 `XMLHttpRequest` 对象            |
| 进度事件     | 提供了更方便的进度事件处理方式，如 `upload` 和 `download` 事件 | 提供了 `progress` 事件用于跟踪请求和下载进度                   |
| 错误处理     | 在请求返回时，只在网络错误或请求被中止时才会抛出异常             | 可以根据响应状态码或其他条件来处理错误                       |
| JSON 处理    | 提供了 `json()` 方法用于解析 JSON 数据                           | 需要手动解析返回的 JSON 数据                                 |
| 文件上传/下载 | 支持直接上传和下载文件，支持 `Blob` 对象                         | 支持通过 `FormData` 和 `responseType` 实现文件上传和下载       |
| 浏览器兼容性 | 部分功能在旧版本浏览器中不支持，需要使用 polyfill 进行兼容性处理  | 在大多数现代浏览器中都支持                                   |

需要注意的是，Fetch API 是基于 Promise 的，而 Ajax 是基于回调函数的。Fetch API 提供了更现代化、更简洁的语法，并支持更多的功能，如跨域请求、取消请求、进度事件等。然而，由于 Fetch API 是较新的标准，不同浏览器的兼容性可能会有所差异，需要使用 polyfill 或考虑兼容性处理。

