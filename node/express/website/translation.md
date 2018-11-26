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



## 指南
### 路由

*Routing* refers to how an application's endpoints(URLs) respond to client requests. For an introduction to routing, see Basic routing.
*路由* 一章涉及到应用的终端(URLs)是如何回复客户端请求的。对于路由的介绍，可参见基础路由一章。


-----

You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET request and app.post() to handle POST requests. For a full list, see app.METHOD. You can also use app.all() to handle all HTTP methods and app.use() to specify middleware as the cllback function(See Using middleware for details).


你通过使用Express的app对象中与HTTP请求对应的方法来定义路由。例如，app.get() 与GET请求对应，而app.post()则与POST请求对应。完整列表可以查看app.METHOD。你同样可以使用app.all()去匹配所有的HTTP方法，使用app.use()去指定回调函数中间件（参考 Using middleware 使用中间件一章）。


---


These routing methods specify a callback function(sometimes called "handler function") called when the application receives a request to the specified route(endpoint) and HTTP method. In other words, the application "listens" for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

这些路由方法指定了回调函数（有时候又称作“句柄函数”），当应用接收到来自指定路由（终端）和HTTP方法的请求时，这些函数就会被调用。换句话说，应用监听匹配到指定到路由和方法的请求。当检测到匹配，就会调用指定的回调函数。



-----

In fact, the routing methods can have more than one callback function as arguments. With multiple callback functions, It is important to provide next as an argument to the callback function and then call next() within the body of the function to hand off control to the next callback.


实际上，路由方法可以拥有不止一个回调函数作为参数。拥有多个回调函数，对于提供next方法给回调函数，并且在函数体内调用next方法将控制权切换至别的next回调来说十分重要。
