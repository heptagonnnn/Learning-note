# ResponseApi


## 响应行
```java
// 默认status 200
respons.setStatus(int status);
```


## 响应头

```java



// 添加
response.addHeader(String header, String value);
response.addIntHeader(String header, int value);
// 毫秒数？。。
response.addDateheader(String header, Date date);



// 修改
response.setHeader(String header, String value);
response.setIntHeader(String header, int value);
response.setDateHeader(String header, Date date);



// 重定向相关
respons.setStatus(302);
response.setHeader("location", String url);
// java内部封装
response.sendRedirect(String url);


// 定时刷新重定向
// url格式, `${秒数};url=${url}`
response.setHeader("refresh", String url);
```
