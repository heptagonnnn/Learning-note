# common module

[toc]


## querystring


## http



## url

对于新的应用，应该使用遵从了WHATWG URL Standard标准的API
即
https://url.spec.whatwg.org
```js
const {URL} = require("url");
```

但有一个较为突出的问题是，URL只能解析完整路径，而原声req.url只有pathname部分
此问题有待解决

## fs
1. fs模块中读出的data为buffer格式，若想使用需先toString？

## mime

## socket.io


## net
connection事件无效？？？？


## htmlparser

## fetch
注意，node中没有原生fetch，因为客户端的fetch寄托于window.fetch

## node-fetch

## util

### util.promisify
!!!!极其特么的好用
