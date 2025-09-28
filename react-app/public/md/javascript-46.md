# 银行卡号四位空一位， 例如：6222023100014763381 -->6222 0231 0001 4763 381

```javascript
var str = '6222023100014763381';
var str=str.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
console.log(str);
```


## Comments / Answers

---

**r-qx** at 2024-12-21T04:20:07Z

如果是字符串声明的话太简单了，建议用BigInt转为字符串