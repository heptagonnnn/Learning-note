#杂谈

[toc]


## options请求


1. 请求以 GET, HEAD 或者 POST 以外的方法发起请求。或者，使用 POST，但请求数据为 application/x-www-form-urlencoded, multipart/form-data 或者 text/plain 以外的数据类型。比如说，用 POST 发送数据类型为 application/xml 或者 text/xml 的 XML 数据的请求。

2. 使用自定义请求头（比如添加诸如 X-PINGOTHER）




## content-type



| content-type | 含义 |
| :------------- | :------------- |
|application/x-www-form-urlencoded | key=value的表单格式，参数间以&分割，默认的编码形式 |
|multipart/form-data| 表单数据编码，与页面中的控件有关 |
| application/json| json格式数据 |
| text/plain | 纯文本 |


## 域名
对于域名的划分，尚存争议
以http://www.baidu.com为例

http为协议

com被成为顶级域名


1. 协议://[依次往下排.]三级域名.二级域名.顶级域名
  baidu: 二级域名
  www: 三级域名

2. 协议://[依次往下排.]二级域名.一级域名.顶级域名
  baidu: 一级域名
  www: 二级域名


### 跨域
跨域是指，协议，顶级域名以下的其他域名，端口号，中有任何一个不相同，即为跨域

跨域场景一定会发一个options请求，称作预请求
用于确认正式请求中header内携带的字段,及其合法类型


前端---fetch
```js
fetch(url, {
  header: {
    "Content-Type": "application/json"
  }
})
```





node为例
若使用原生代码
```js
app.all("*", (req, res, next) => {
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method = "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});
```

若使用cors库
```js
const cors = require("cors");

app.use(cors());
```

### cookie跨域

对于一般跨域请求，可以使用
```JavaScript
"access-control-allow-origin": "*"
```

但是若存在cookie跨域时
对于fetch请求
```JavaScript
fetch("/test", {
  credentials: "include"
});
```
fetch的credentails为include时，表示可以进行cookie跨域
但出于安全性角度，此时http头中的access-control-allow-origin不能设置为*

在无特殊安全要求的场景下，可以在express中，将request的地址动态设置为origin来解决此问题


cors中关于origin的源码
```JavaScript
var corsOptions = assign({}, defaults, options);
         var originCallback = null;
         if (corsOptions.origin && typeof corsOptions.origin === 'function') {
           originCallback = corsOptions.origin;
         } else if (corsOptions.origin) {
           originCallback = function (origin, cb) {
             cb(null, corsOptions.origin);
           };
         }

         if (originCallback) {
           originCallback(req.headers.origin, function (err2, origin) {
             if (err2 || !origin) {
               next(err2);
             } else {
               // 当不存在err2， 且有origin 时，将origin作为头中的origin字段
               corsOptions.origin = origin;
               cors(corsOptions, req, res, next);
             }
           });
         } else {
           next();
         }
```
完整代码如下
```javascript
const express = require("express");
const cors = require("cors");

const app = express();




/*
根据cors中间件的文档，配置对象的origin字段为一个函数时，第一个参数时request地址，第二个参数是是一个回调参数

回调参数中第一个参数是
*/
const corsConfig = {
  origin: function(req, cb) {
    // 此处的req就是发起请求页面的origin
    cb(undefined, req);
  },
  credentials: true
};
// 使用中间件
// 跨域
app.use(cors(corsConfig));

```
