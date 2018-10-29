# nodejs实战笔记

[toc]

## 第三章
node的模块系统基于CommonJS规范(www.commonjs.org/specs/modules/1.0/)


### 3.1 模块机制

模块寻找机制

1.  node_modules文件外
    ![node_modules外模块寻找机制](./out_node_modules.jpg)

2.  node_modeuls文件内
    ![node_modules内模块寻找机制](./in_node_modules.jpg)

### 3.2 异步编程技术

回调

事件监听

### 3.3 异步逻辑顺序化

3.3.1 串行流程控制
文章中使用了数组的方式，一次触发push进数组的函数，从而实现串行流程的控制。

由于node支持promise，故使用promise实现流程控制

```js
const fs = require("fs");
const request = require("request");
const htmlparser = require("htmlparser");
const configFilename = "./rss_feeds.txt";


checkForRSSFile()
  .then((filename) => readRSSFile(filename))
  .then((url) => downloadRSSFeed(url))
  .then((rss) => parseRSSFeed(rss))
  .catch(e => {
    console.error(e);
  });


function checkForRSSFile() {
  return new Promise(function (resolve, reject) {
    fs.access(configFilename, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(configFilename);
    })
  })
}

function readRSSFile(configFilename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(configFilename, function (err, feedList) {
      if (err) {
        reject(err);
        return;
      }

      feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split("\n");

      const random = Math.floor(Math.random() * feedList.length);
      resolve(feedList[random]);
    });
  });
}


function downloadRSSFeed(feedUrl) {
  return new Promise(function(resolve, reject) {
    request({uri: feedUrl}, function(err, res, body) {
      if (err || res.statucCode !== 200) {
        reject(err);
        return;
      }
      resolve(body);
    })
  })
}


function parseRSSFeed(rss) {
  return new Promise(function (resolve, reject) {
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if (!handler.dom.items.length) {
      reject();
      return;
    }
    const item = handler.dom.items.shift();
  });
}
```

3.3.3 并行流程控制
通过Promise.all实现

```js
const fs = require("fs");
const util = require('util');


const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);


const tasks = [];
const wordCounter = {};

const filesDir = "./text";


function tasksComplete() {
  for (const i in wordCounter) {
    console.log(`${i}: ${wordCounter[i]}`)
  }
}


function countWordsInText(text) {
  const words = text.toString().toLowerCase().split(/\W+/).sort();
  for (const i in words) {
    const word = words[i];
    if (word) {
      wordCounter[word] = (wordCounter[word]) ? wordCounter[word] + 1 : 1;
    }
  }
}


readDir(filesDir)
  .then(files => {
    files.forEach((file) => {
      const tmp = readFile(`${filesDir}/${file}`).then(text => {
        countWordsInText(text);
      });
      tasks.push(tmp);
    });
    return Promise.all(tasks);
  })
  .then(e => {
    tasksComplete();
  })
  .catch(e => {
    console.error(e);
  });
```


## 第四章

### 4.3 提供静态文件服务

```js
const http = require("http");
const {parse} = require("url");
const {join} = require("path");
const {promisify} = require("util");
const fs = require("fs");


const stat = promisify(fs.stat);

const root = __dirname;


statusFactory.registerStatus(404, "404 Not Found");
statusFactory.registerStatus(500, "Internal Server Error");


const server = http.createServer((req, res) => {
    const url = parse(req.url);

    const path = join(root, url.pathname);

    stat(path)
        .then((stat) => {
            responseFile(res, stat, path);
        })
        .catch(err => {
            console.log(err);
            if ("ENOENT" === err.code) {
                statusFactory.useStatus(res, 404);
            } else {
                statusFactory.useStatus(res, 500);
            }
        })
});


server.listen(8081);


const statusFactory = {
    registerStatus(status, text) {
        this[status] = text;
    },
    useStatus(res, status) {
        res.statusCode = 404;
        res.end(this[status]);
    }
};

function responseFile(res, stat, path) {
    res.setHeader("Content-Length", stat.size);

    const stream = fs.createReadStream(path);
    stream.pipe(res);

    stream.on("error", (err) => {
        statusFactory.useStatus(res, 500);
    })
}
```
### 4.4 表单提交
4.4.1
```js
const http = require("http");
const qs = require("querystring");

const items = [];

const server = http.createServer((req, res) => {
  if ('/' === req.url) {
    switch (req.method) {
      case "GET":
        show(res);
        break;
      case "POST":
        add(req, res);
        break;
      default:
        badRequest(res);
    }
  } else {
    notFound(res);
  }
});


server.listen(8081);


function show(res) {
  const html =
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
    <h1>Todo List</h1>
    <ul>
    ${items.map((item) => {
      return "<li>" + item + "</li>"
    }).join("")}
    </ul>

    <form method="post" action="/">
        <p>
        <input type="text" name="item">
        </p>
        <p>
          <input type="submit" value="Add Item">
        </p>
    </form>
    </body>
    </html>
    `;

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(html));
  res.end(html);
}



function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-type", "text/plain");
  res.end("Not Found");
}


function badRequest(res) {
  res.statusCode = 400;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");
}

function add (req, res) {
  let body = "";
  req.setEncoding("utf8");
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", function() {
    const obj = qs.parse(body);
    console.log(body);
    console.log(obj);
    items.push(obj.item);
    show(res);
  })
}
```



## 第五章

### 5.1 无服务器数据存储

无服务器数据存储包括内存存储和文件存储

1. 内存存储
内存存储的特点是快速，高效。
缺点是无法做到持久化(persistance)，数据容易丢失

2. 文件存储
文件存储常用于保存配置信息，有一定的持久化能力。
缺点是无法应对并发情况


### 5.2 关系型数据库管理系统
RDBMS--relational database menage system
ORM--Object Relational Mapping

可以存储复杂的信息，查询容易
可通过ORM API操作


5.2.1 MySQL


## 第六章

### connect
