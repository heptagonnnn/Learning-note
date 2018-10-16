# etc
[toc]

## JAR, EAR, WAR？

### JAR- (Java ARchive)
JAR文件格式以流行的ZIP文件格式为基础


作用

主要用于
1. 压缩和发布
2. 部署和封装库、组件和插件程序

JAR包可被编译器和JVM直接使用

文件目录

```text
tools.JAR
  |--resource.xml   //资源配置文件
  |--other.xml
  |--META-INF
    |--MENIFEST.MF  //jar包描述文件
  |--com(或其他)            //类的包目录
    |--test
      |--util.class   //java类文件
```


### WAR-(Web ARchive)

WAR，网络应用程序文件，是与平台无关的文件格式，它允许将许多文件组合成一个压缩文件。
WAR专用在web方面，JAVA WEB工程，都是打成WAR包进行发布


```text
webapp.war
|--index.jsp      // 入口？
|--images
|--META-INF
|--WEB-INF
  |--web.xml      //WAR包描述文件
  |--classes
    |--test.class //JAVA类文件
  |--lib          //依赖jar包
  
```
