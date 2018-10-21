# Spring 学习之路

[toc]
<https://www.cnblogs.com/ityouknow/p/5662753.html>

## Spring 项目目录分析

```text
root
|--src
  |--main
    |--java                 // 核心代码
      |--com
        |--packageName
          |--projectName
            |--entity                         //JavaBean
            |--repository                     //DAO文件
            |--Application.class              // 入口文件
    |--resources            // 配置文件，如数据库
  |--test
    |--java                 // 于main/java文件
|--.mvn
|--pom.xml
```

## JPA

Java Persistance API

JPA常用注解


```Java
// 类注解
@Table(name = "my_user")
/*
  Table注解，用于设置连接数据库的表的配置，如连接的表名
  默认值为类名自动转换的表名
  User ---》 user
*/
@Entity
/*
  Entity注解
  指明该类为Java实体类，将映射到制定的数据库表
*/
@DynamicUpdate
/*
  DynamicUpadte注解
  表示upadate对象时，生成动态的sql语句
  主要用于解决数据库中缺省值为CURRENT_TIMESTAMP之类的自动生成的值的更新问题
*/

public Class User {



  @Id
  /*
    主键字段
  */
  @GenerateValue
  /*
    主键的生成策略
    GenerateType.AUTO
      默认选项，有JPA自动匹配增长策略

    GenerateType.IDENTITY
      采用数据库ID自增长的方式来自增主键字段，oracle不支持
      在mysql中，若GenerateType.AUTO会报错，可以手动设置成IDENTITY

    GenerateType.SEQUENCE
      通过序列产生主键，通过 @SequenceGenerator 注解指定序列名，MySql 不支持这种方式

    GenerateType.TABLE
      通过表产生主键，框架借由表模拟序列产生主键，使用该策略可以使应用更易于数据库移植。
  */
  private int id;


  @Column(
    name = "my_name"
  )
  /*
    当实体的属性与其映射的数据库表的列不同名时需要@Column标注说明
    也有一些其他属性，如unique，nullable，length等
  */
  private String name;


  @Transient
  /*
    Transient的因为翻译为暂时的，路过的。与JPA中的persistance正好相反
    表示该属性并非一个到数据库表的字段映射，ORM框架将忽略该属性
  */
  private String log;

  @Temporal
  /*
  在核心的 Java API 中并没有定义 Date 类型的精度(temporal precision). 而在数据库中,表示 Date 类型的数据有 DATE, TIME, 和 TIMESTAMP 三种精度(即单纯的日期,时间,或者两者 兼备).

  在进行属性映射时可使用@Temporal注解来调整精度.

  默认值为TIMESTAMP

  TemporalType.TIMESTAMP
    时间戳精度
    yyyy-MM-dd hh:mm:ss

  TemporalType.DATE
    精度到天
    yyyy-MM-dd

  TemporalType.TIME
    精确到秒
    hh:mm:ss

  */
  private Date dateNow;
}
```

```Java
@Transactional
```


## lombok
