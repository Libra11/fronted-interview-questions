# Map 和 Object 有哪些主要的区别？

不过 Map 和 Object 有一些重要的区别，在下列情况中使用 Map 会是更好的选择：

<table class="standard-table">
  <thead>
    <tr>
      <th scope="row"></th>
      <th scope="col">Map</th>
      <th scope="col">Object</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">意外的键</th>
      <td><code>Map</code> 默认情况不包含任何键。只包含显式插入的键。</td>
      <td>
        <p>一个 <code>Object</code> 有一个原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。</p>
        <div class="notecard note" id="sect1">
          <p><strong>备注：</strong>虽然可以用 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create"><code>Object.create(null)</code></a> 来创建一个没有原型的对象，但是这种用法不太常见。</p>
        </div>
      </td>
    </tr>
    <tr>
      <th scope="row">键的类型</th>
      <td>一个 <code>Map</code> 的键可以是<strong>任意值</strong>，包括函数、对象或任意基本类型。</td>
      <td>一个 <code>Object</code> 的键必须是一个 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String"><code>String</code></a> 或是 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol"><code>Symbol</code></a>。</td>
    </tr>
    <tr>
      <th scope="row">键的顺序</th>
      <td>
        <p><code>Map</code> 中的键是有序的。因此，当迭代的时候，一个 <code>Map</code> 对象以插入的顺序返回键值。</p>
      </td>
      <td>
        <p>虽然 <code>Object</code> 的键目前是有序的，但并不总是这样，而且这个顺序是复杂的。因此，最好不要依赖属性的顺序。</p>
        <p>
          自 ECMAScript 2015 规范以来，对象的属性被定义为是有序的；ECMAScript 2020 则额外定义了继承属性的顺序。参见 <a href="https://tc39.es/ecma262/#sec-ordinaryownpropertykeys" class="external" target="_blank">OrdinaryOwnPropertyKeys</a>
          和
          <a href="https://tc39.es/ecma262/#sec-enumerate-object-properties" class="external" target="_blank">EnumerateObjectProperties</a> 抽象规范说明。但是，请注意没有可以迭代对象所有属性的机制，每一种机制只包含了属性的不同子集。（<a href="/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in"><code>for-in</code></a>
          仅包含了以字符串为键的属性；<a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys"><code>Object.keys</code></a>
          仅包含了对象自身的、可枚举的、以字符串为键的属性；<a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames"><code>Object.getOwnPropertyNames</code></a>
          包含了所有以字符串为键的属性，即使是不可枚举的；<a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols"><code>Object.getOwnPropertySymbols</code></a>
          与前者类似，但其包含的是以 <code>Symbol</code> 为键的属性，等等。）
        </p>
      </td>
    </tr>
    <tr>
      <th scope="row">Size</th>
      <td><code>Map</code> 的键值对个数可以轻易地通过 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/size"><code>size</code></a> 属性获取。</td>
      <td><code>Object</code> 的键值对个数只能手动计算。</td>
    </tr>
    <tr>
      <th scope="row">迭代</th>
      <td><code>Map</code> 是 <a href="/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols">可迭代的</a> 的，所以可以直接被迭代。</td>
      <td>
        <p><code>Object</code> 没有实现 <a href="/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol">迭代协议</a>，所以使用 JavaSctipt 的 <a href="/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of">for...of</a> 表达式并不能直接迭代对象。</p>
        <div class="notecard note" id="sect2">
          <p><strong>备注：</strong></p>
          <ul>
            <li>对象可以实现迭代协议，或者你可以使用 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys"><code>Object.keys</code></a> 或 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries"><code>Object.entries</code></a>。</li>
            <li>
              <a href="/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in">for...in</a>
              表达式允许你迭代一个对象的<em>可枚举</em>属性。
            </li>
          </ul>
        </div>
      </td>
    </tr>
    <tr>
      <th scope="row">性能</th>
      <td>
        <p>在频繁增删键值对的场景下表现更好。</p>
      </td>
      <td>
        <p>在频繁添加和删除键值对的场景下未作出优化。</p>
      </td>
    </tr>
    <tr>
      <th scope="row">序列化和解析</th>
      <td>
        <p>没有元素的序列化和解析的支持。</p>
        <p>（但是你可以使用携带 <em>replacer</em> 参数的 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"><code>JSON.stringify()</code></a> 创建一个自己的对 <code>Map</code> 的序列化和解析支持。参见 Stack Overflow 上的提问：<a href="https://stackoverflow.com/q/29085197/" class="external" target="_blank">How do you JSON.stringify an ES6 Map?</a>）</p>
      </td>
      <td>
        <p>原生的由 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Object</code></a> 到 JSON 的序列化支持，使用 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"><code>JSON.stringify()</code></a>。</p>
        <p>原生的由 JSON 到 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Object</code></a> 的解析支持，使用 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse"><code>JSON.parse()</code></a>。</p>
      </td>
    </tr>
  </tbody>
</table>