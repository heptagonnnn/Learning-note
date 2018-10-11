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



## 下载

本质上就是访问服务器指定资源
1. 若浏览器能解析，就会显示解析后的内容，如mp4，jpg文件
2. 浏览器无法解析，就会启动下载程序，如.rar,.zip


若全部资源都要以不解析下载的方式进行，则需要使用下载技巧

1. 通过携带参数访问指定路径，如文件名，或文件id
2. 在servlet内部，使用文件名，拼接成绝对路径
3. 根据路径，将文件加载到程序内部，如FileInputSteam
4. 将读取到文件的流对象，使用ServletOutputStream返回到浏览器中
