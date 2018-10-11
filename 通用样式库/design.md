# 通用样式库设计构想
[toc]

## 文件结构

```text
style
|--variable
  |--color.scss // 颜色声明文件
|--color--字体/背景等颜色相关
  |--index.scss // 入口文件
  |--font-color.scss // 字体颜色应用文件--导入index
|--layout // 布局相关
  |--box.scss // 盒模型相关--1.margin;2.padding;3.border;4.box-sizng;
|--base // 全局默认样式类
```


## 颜色

### 如何给颜色命名

1. http://chir.ag/projects/name-that-color/#28290F

    对颜色进行专业英语的命名


2. 将色号写入变量名中（倾向此类）
  a. 大概颜色-色号缩写
  b. 纯色号

### 文件结构及功能

#### style/variable/color.scss

用于储存颜色变量

#### style/color/font-color.scss
字体颜色应用
1. 常用颜色类
