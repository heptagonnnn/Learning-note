# express 官网自翻


[toc]


## 快速入门

### hello world 样例



Embedded below is essentially the simplest Express app you can create. It is a single file app — not what you’d get if you use the Express generator, which creates the scaffolding for a full app with numerous JavaScript files, Jade templates, and sub-directories for various purposes.


下面的代码实例从本质上来说，是你可以创建的最简单的Express应用。这只是一个简单的文件应用，与你用Express-generator创建的应用不同。Express-generator利用脚手架创建的app包含了众多JS文件，Jade模版，以及其他用途的子目录。

```text
此处Embeded表示为嵌入式感觉不太妥，结合排版和语义，认为理解为为嵌入的（代码块）更为合适
```

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'));
```

---

This app starts a server and listens on port 3000 for connections. The app responds with “Hello World!” for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.


这个app启动了一个服务器，并监听了3000端口的连接。app对于根URL(/)的请求返回"Hello World"。对于其他的任意路径，他将返回404 NOT FOUND

---


The example above is actually a working server: Go ahead and click on the URL shown. You’ll get a response, with real-time logs on the page, and any changes you make will be reflected in real time. This is powered by RunKit, which provides an interactive JavaScript playground connected to a complete Node environment that runs in your web browser. Below are instructions for running the same app on your local machine.


上面的例子是一个可以实际运行的服务器：去点一下我们给你URL试试。你会在页面上得到一个实时的日志，你做的任何更改，都会实时反映出来。这一功能由RunKit驱动，RunKit运行在浏览器上，可以提供一个连接至完整Node环境的交互式JS环境。

----

RunKit is a third-party service not affiliated with the Express project

Runkit是一个不隶属与Express项目的第三方服务


---

Running Locally


First create a directory named myapp, change to it and run npm init. Then install express as a dependency, as per the installation guide.

In the myapp director, create a file named app.js and copy in the code from the example above.


本地运行

首先创建一个myapp目录，切换进目录并且运行npm init。然后安装express依赖，正如安装指南一章中介绍的

在myapp目录中创建app.js文件， 并且将上文的实例代码拷贝进去


---

The req(request) and res(response) are the exact same objects that Node provides, so you can invoke req.pipe(), req.on("data", callback), and anything else you would do without Express involved.


Run the app with the following command:



```shell
node app.js
```

Then, load http://localhost:3000/ in a browser to see the output.



req(request)对象和res(response)对象与Node中提供的是完全相同的对象。所以你可以调用诸如req.pipe()， req.on("data", callback)等Express中没有的方法


以下列指令启动app

```shell
node app.js
```


然后，在浏览器中打开 http://localhost:3000/ 查看输出
