// 引入http模块
const http = require("http");
// 引入CRUD及业务逻辑模块
const work = require("./lib/timetrack");

// 引入MySQL ORM模块
const mysql = require("mysql");

// 引入promise化模块
const {promisify} = require("util");


// 连接数据库
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "11111111",
  database: "node"
});

// db.query promise化
db.query = promisify(db.query);


// 服务器监听
const server = http.createServer((req, res) => {
  // 根据涉及数据更改的请求，使用post方式。 虽然不遵守RESTful原则，但是避免了跨域问题，舒服，简单
  switch(req.method) {
    case "POST":
      switch(req.url) {
        case "/":
          // 添加
          work.add(db, req, res);
          break;

        case "/archive":
          // 更新
          work.archive(db, req,res);
          break;

        case "/delete":
          // 删除
          work.delete(db, req, res);
      }
      break;
    case "GET":
      switch(req.url) {
        case "/":
          // 查看未完成
          work.show(db, res);
          break;

        case "/archived":
          // 查看已完成
          work.showArchived(db, res);
          break;
      }
      break;
  }
});



// 若表不存在，先建表，然后直接监听8081端口
db.query(
  `
  CREATE TABLE IF NOT EXISTS work (
    id INT(10) NOT NULL AUTO_INCREMENT,
    hours DECIMAL(5,2) DEFAULT 0,
    date DATE,
    archived INT(1) DEFAULT 0,
    description LONGTEXT,
    PRIMARY KEY(id)
  )
  `
).then(e => {
  server.listen(8081);
});