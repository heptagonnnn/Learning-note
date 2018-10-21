#杂谈

[toc]


## 关于post请求与options请求


1. 请求以 GET, HEAD 或者 POST 以外的方法发起请求。或者，使用 POST，但请求数据为 application/x-www-form-urlencoded, multipart/form-data 或者 text/plain 以外的数据类型。比如说，用 POST 发送数据类型为 application/xml 或者 text/xml 的 XML 数据的请求。

2. 使用自定义请求头（比如添加诸如 X-PINGOTHER）







## content-type



| content-type | 含义 |
| :------------- | :------------- |
|application/x-www-form-urlencoded | key=value的表单格式，参数间以&分割，默认的编码形式 |
|multipart/form-data| 表单数据编码，与页面中的控件有关 |
| application/json| json格式数据 |
| text/plain | 纯文本 |
