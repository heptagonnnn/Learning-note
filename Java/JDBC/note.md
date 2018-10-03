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


### 数据库连接池与配置文件
