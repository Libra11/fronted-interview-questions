# 前端做错误监控？

## 错误监控

**错误分类**：即时运行错误（代码错误）、资源加载错误

### 错误的捕获方式：
**即时运行错误:**
try...catch                     	
window.onerror

**资源加载错误:**                                   
1)、object.onerror	                
2)、performance.getEntries()                     
3)、Error事件捕获                    
performance.getEntries()这个是可以获取到所有的家已经加载的资源

Error事件捕获使用方式:
```javascript
window.addEventListener('error',function(e){
    console.log('捕获',e)
},true)
```

跨域是可以捕获的:                            
1）、在script标签添加crossorigin属性                              
2)、在js响应头添加Access-Control-Allow-Origin:*;


上报错误：ajax通信方式上报、通过Image对象上报,非常简单                    
(new Image()).src='http://baidu.com/test/sdflijsd?=sdlfkj';