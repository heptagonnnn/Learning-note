# requestApi
[toc]


## 请求行

以http://localhost:8080/login?username=111&password=222
### String getMethod();

获取请求方法

### String getRequestURI();
获取uri
```text
/login
```


### StringBuffer getRequestURL();
获取url
```text
http://localhost:8080/login
```

### String getQueryString();
获取参数字符串
```text
username=111&password=222
```


### String getContextPath();
获取当前应用名称
```text
/login
```


## 请求头


### Enumeration\<String\> getHeaderNames();


### String getHeader(String header_key);

#### referer的作用
用于表示从那个页面跳转过来的

主要用于防盗链，对于非法referer作出处理


## 获取参数

### String getParameter(param_key);

### String[] getParamaters(params_key);

### Enumeration\<String\> getParameterNames();



## 编码

### void setCharacterEncoding(String encoding);

设置编码方式

## 请求转发

### RequestDispatcher getDispatcher (String url);

获取指定servlet的转发器

```java
 RequestDispatcher rd = request.getDispatcher("/other")
 // 此处的url是服务器端地址，既不包括项目名，只能转发至该项目内的servlet

// 进行转发
 rd.forword(request, response);
 ```


#### 请求转发与重定向的区别
1. 请求转发
  请求转发是服务器的内部行为，该行为对客户端是透明的。
  客户端不知道转发的任何细节，一切header都与直接访问原始地址相同

2. 重定向
  重定向是客户端行为
  是根据header中的location进行跳转，从而对新地址进行访问，与直接访问新地址没有差别



## Request域对象

用于单次请求中的数据共享

注意： requeset与servletContext对象不同
每个servlet中的request实例都是不同的对象
通过转发器的forward方法，将原request的内容复制进目标request

```java
// servlet1

request.setAttribute("test", "123");


//servlet2
String test = request.getAttribute("test");
```
