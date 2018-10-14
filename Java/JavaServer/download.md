# download
[toc]


## 原理

1. 读取服务器指定路径的资源
2. 通过字节码读写，放入缓冲区
3. 返回

getRealPath(path)函数的获得的是以WebContent为基准的拼接path得出的绝对路径

## 简单实现

### 流程

1. 获取文件绝对路径
2. 利用FileInputStream读取字节码
3. 将字节码写入ServletOutputStream，进而放入缓冲区
4. （自动返回）


```java
@WebServlet("/download")
public class Download extends HttpServlet {

  // service方法
  protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    // 1. 获取文件地址
    String path = this.getServletContext().getRealPath();

    // 2. 利用FileInputStream读取字节码

    FileInputStream in = new FileInputStream(path);

    byte[] buffer= new byte[1024];
    int length;

    ServletOutputStream out = response.getOutputStream();

    while((length = in.read(buffer)) != 1) {
      // 将字节码写入ServletOutputStream
      out.write(buffer, 0, length);
    }
  }
}
```



## 使用附件形式下载

### 流程
1. 通过参数形式，获取文件名,mime
2. 设置请求头，告知浏览器以附件形式下载
3. 设置请求头，规定mime类型
4. 简单实现


```java
@webServlet("/download")
class Download extends HttpServlet {


  protected void service (HttpServletRequest request, HttpServletResponse response) {
    // 1. 获取文件名，mime
    String filename = request.getParamater("filename");
    String path = this.getServletContext().getRealPath();

    String mime = this.getServletContext().getMimeType(path);
    // 2. 设置请求头，确定附件形式,mimetype

    response.setHeader("Content-Disposition", "attachment;filename=" + filename);

    response.setContentType(mime);


    // 3. 读取文件

    FileInputStream in = new FileInputStream(path);
    ServletOutputStream out = response.getOutputStream();

    byte[] buffer = new byte[1024];

    int lengh;

    whilte((length = in.read(buffer)) != 1) {
      out.write(buffer, 0, length);
    }




  }
}
```
