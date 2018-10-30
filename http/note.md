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


## 跨域处理方案

此种方案设计两种场景
1. 跨域
2. 需要发送options请求

## 域名
对于域名的划分，尚存争议
以http://www.baidu.com


### 跨域
跨域是指，协议，二级域名，端口号，



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
