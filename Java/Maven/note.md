# Maven
[toc]

## POM

Project Object Model，项目对象模型是Maven的基本工作单元，是一个XML文件，包含了项目的基本信息，用于描述项目如何构建，声明项目依赖，等等。


POM中可以指定以下配置

1. 项目依赖
2. 插件
3. 执行目标
4. 执行构建profile
5. 项目版本
6. 项目开发者列表
7. 相关邮件列表信息


下面以标准maven webapp自动生成xml做基本解释
```XML
<?xml version="1.0" encoding="UTF-8"?>
<!-- xml版本，编码方式 -->

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

  <!-- xml规则文档 -->
  <modelVersion>4.0.0</modelVersion>

  <!-- xml模型版本 -->
  <groupId>com.heptagon.maven</groupId>
   <!-- 项目的唯一标识符 -->


  <artifactId>mavenDemo</artifactId>
  <!-- 构件的唯一标识符，与groupId一起，共同标识一个构件 -->

  <version>1.0-SNAPSHOT</version>
  <!-- 构件版本 -->

  <packaging>war</packaging>
  <!-- 构件的类型 -->


  <name>mavenDemo Maven Webapp</name>
  <!--  -->


  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>
  <!-- 项目的主页 -->

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <!--  -->
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
  </properties>

  <dependencies>
    <!-- 依赖管理 -->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <finalName>mavenDemo</finalName>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <!-- 插件信息 -->
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.0.0</version>
        </plugin>
        <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.7.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.20.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-war-plugin</artifactId>
          <version>3.2.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>
```
## 构建（build）生命周期


## Maven构建配置文件
