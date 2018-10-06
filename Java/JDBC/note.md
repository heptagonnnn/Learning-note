# JDBC note
[toc]
## 核心类

DriverManager

## 核心接口

Connection
Statement
ResultSet



## JDBC流程及各类的作用





使用原生/dpbc/druid进行数据库操作

1. 获取连接数据库后的Connection对象
2. 获取数据库操作对象Statement进行操作
3. 如果是Query操作，则用ResultSet对象进行接收
4. 断开Connection对象，Statement对象和ResultSet对象的连接

```java
String url = "jdbc:mysql://localhost:3306/mmall";
String driverName = "com.mysql.jdbc.Driver";
String useranme = "root";
String password = "11111111";
String querySql = "Select * from table;";
String updateSql = "insert into table (id) values(1);";
// 原生
// 1. 利用反射加载连接驱动
Class.forName(driverName);

// 2. 使用DriverManager获取Connection实例化对象
Connection conn = DriverManager.getConnection(url, username, password);
// 3. 利用Connection 获取 连接数据库后的操作对象
Statement st = conn.createStatement();

//4. 利用Statement进行数据库操作
// 查询语句，返回ResultSet对象
ResultSet rs = st.executeQuery(querySql);

// 增删改操作

int raws = st.executeUpdate(updateSql);


conn.close();
st.close();
rs.close();


// DBCP
// 主要的差距在于，每次进行操作，是利用连接池

// 1. 读取配置文件，获取

Properties p = new Properties.getProperties();
p.load(db.properties);
DataSource ds = BasicDataSourceFactory.createDataSource(p);
Connection conn = ds.getConnection();
Statement st = conn.createStatement();
// 查询语句，返回ResultSet对象
ResultSet rs = st.executeQuery(querySql);

// 增删改操作

int raws = st.executeUpdate(updateSql);

conn.close();
st.close();
rs.close();

// druid
Properties p = new Properties.getProperties();
p.load(db.properties);

DataSource ds = DruidDataSourceFactory.createDataSource(p);
Connection conn = ds.getConnection();
Statement st = conn.createStatement();
// 查询语句，返回ResultSet对象
ResultSet rs = st.executeQuery(querySql);

// 增删改操作

int raws = st.executeUpdate(updateSql);

conn.close();
st.close();
rs.close();

```

## 主要概念

### DAO

### 预编译语句

#### PreparedStatement
用于接收模版sql语句

```
insert into stu (id, name) values (? , ? );
```

然后使用适当的set方法，对指定位置的‘？’进行替换，生成最终mysql语句

```Java
String sql = "insert into stu (id, name) values(?, ?);";

conn = JdbcUtil.getConnection();
ps = conn.preparedStatement(sql);

ps.setInt(1, 1);
ps.setString(2, "name");

// 或者使用setObject方法进行自动判断
ps.setObject(1, 1);
ps.setObject(2, "name");

ps.executeUpdate();

// 或
ps.executeQuery();
```

### 数据库连接池与配置文件
#### Properties
Properties对象用于读取配置文件

```Java
FileInputStream f = new FileInputStream("resource/db.properties");

Properties p = new Properties();

p.load(f);

//db.Properties
// 文档中所有内容都活会自动按字符串处理，不需要加双引号
url=jdbc:mysql://localhost:3306/mmall
username=root
password=11111111
driverClassName=com.mysql.jdbc.Driver

// 读取属性

p.getProperties("url");
p.getProperties("id");
```



### 数据集处理器

#### 解决问题
将结果集处理逻辑与制定对象解耦，通过内省的方式，动态获取需要处理的对象类型

```Java
// 使用制定对象类型的结果集处理器
public Student Handler(ResultSet rs) throws Exception {
  Student stu = new Student();
  if (rs.next()) {
    stu.setName(rs.getObject("name"));
    stu.setAge(rs.getObject("age"));

    return stu;
  }
  return null;
}

// 使用内省与范型，将handler与student类解耦
interface IResultSetHandler<T>{
  public T handler(ResultSet rs) throws Exception;
}

class BeanHandler<T> implements IResultSetHandler<T> {
  private Class<T> classType;

  public BeanHandler(Class<T> classType) {
    this.classType = classType;
  }


  public T handler(ResultSet rs) throws Exception {

    if (rs.next()) {
      // 利用反射获取对象实例
      T obj = this.classType.getDeclaredConstructor().newInstance();

      // 获取简单JAVA类的信息
      BeanInfo bf = Introspector.getBeanInfo(this.classType, Object.class);

      // 获取属性信息
      PropertiesDescriptor[] pds = bf.getPropertiesDescriptors();

      // 利用对象的属性名，与数据库中的字段一致这一特点，将数据库中的字段值写入实例对象对应的属性中

      for (PropertiesDescriptor pd: pds) {

        // 读取对象属性名--》找到数据库中对应的列名--》取出其中的值
        Object val = rs.getObject(pd.getName());

        // 利用属性描述符获取的属性setter方法，将值写入对象实例

        pd.getWriteMethod().invoke(obj, val);


      }

      return obj;
    }
    return null;

  }

}
//




```
