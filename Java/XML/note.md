# XML
[toc]


##定义

XML---- Extensible MarkupLanguage

可扩展标记语言



## 用途

1. 存储数据

2. 配置文件


## 基本语法


### 文档生声明

1. 必须位于文件第一行

2. 用于声明版本等信息

```XML
<?xml version="1.0" encoding="UTF-8"?>
```
version: xml版本

encoding: 字符集

M
### 规则
1. 所有xml元素必须闭合

2. 大小写敏感

3. 正确嵌套

4. 文档必须有跟元素

5. 元素的属性值必须加引号

6. 实体引用

    在xml中，一些字符拥有特殊的意义，如果把特殊字符放在xml元素中，会发生错误

    因为规定了5个预定义的实体引用，用于代替实体符号

    |实体符号|实体引用|
    |----|----|
    |<|\&lt;|
    |>|\&gt;|
    |&|\&amp;|
    |'|\&apos;|
    |"|\&quot;|

### 元素

#### 命名规则

1. 可以包含数字、字母及其他字符。
2. 不能以数字或标点符号开始
3. 名称中不能有xml（不区分大小写）
4. 名称不能包含空格


#### 文本规则

1. 特殊符号需要转义
2. 若嵌套子标签不需要编译，需要使用CDATA
```XML
<parent>
  <![CDATA[
    <child>child</child>
  ]]>
</parent>
```


## XML约束

### DTD约束
#### 内部DTD（不常用）
#### 外部DTD
引用方式

```xml
<!DOCTYPE ${DTD约束对象} SYSTEM(表示从本地读取文件) "文件路径">

<!DOCTYPE students SYSTEM "students.dtd">

<!DOCTYPE ${DTD约束对象} PUBLIC（表示从网络读取文件） "文件路径">

<!DOCTYPE students PUBLIC "//students.dtd">
```

#### DTD语法结构

```dtd
<!ELEMENT ${element_name} (${child_name}*, ${child_name}+, ${child_name}?, (child_a|child_b))>


/*
  *: 表示0-多个，
  +: 表示1-多个，
  ?: 表示0或1个
  |: 表示或
*/


<!ELEMENT ${element_name} (#PCDATA)>

/*
  表示文本内容
*/

```

1. 子元素出现的顺序必须与在父元素声明重的顺序一致


```dtd

```
### schema



## XML文档结构

1. 文档节点
    xml文件

2. 元素节点
    <>标签

3. 属性节点
    ```
    <ele key="value"></ele>
    ```
4. 文本节点
    ```
    <ele>text node</ele>
    ```
