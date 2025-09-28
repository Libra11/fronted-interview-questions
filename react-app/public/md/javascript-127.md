# 如何实现可过期的 localstorage 数据?

以下是一个封装了支持过期时间的`localStorage`的示例代码：

```javascript
class EnhancedLocalStorage {
  constructor() {
    this.prefix = 'enhanced_storage_';
  }

  setItem(key, value, expirationInSeconds) {
    const item = {
      value,
      expirationTime: expirationInSeconds? Date.now() + expirationInSeconds * 1000 : null
    };
    localStorage.setItem(this.prefix + key, JSON.stringify(item));
  }

  getItem(key) {
    const itemStr = localStorage.getItem(this.prefix + key);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    if (item.expirationTime && item.expirationTime < Date.now()) {
      localStorage.removeItem(this.prefix + key);
      return null;
    }
    return item.value;
  }

  removeItem(key) {
    localStorage.removeItem(this.prefix + key);
  }
}

const enhancedStorage = new EnhancedLocalStorage();
export default enhancedStorage;
```

使用方法如下：

```javascript
// 设置带有过期时间的存储项
enhancedStorage.setItem('myKey', 'myValue', 60); // 60 秒后过期

// 获取存储项
const value = enhancedStorage.getItem('myKey');
console.log(value);

// 一段时间后，存储项过期
setTimeout(() => {
  const expiredValue = enhancedStorage.getItem('myKey');
  console.log(expiredValue); // null
}, 65000);
```

在这个封装中，使用了一个自定义的前缀来避免与普通的`localStorage`键冲突。设置项时，会记录一个过期时间，如果有过期时间且当前时间超过了过期时间，在获取项时会返回`null`并自动删除该项。