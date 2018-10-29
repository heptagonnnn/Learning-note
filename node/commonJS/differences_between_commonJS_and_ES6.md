# differences between commonJS and ES6

[toc]
## commonJS

### default export

commonJS中实现default export的方法是通过重写module.exports对象；


在commonJS规范中，每一个模块的头部，可以等效认为存在以下js语句
```js

const module = {
  exports: {}
}

const exports = module.exports;
```

通过如上方法建立了exports变量与module变量的关系
并且简化了module的使用，直接使用exports便可完成模块输出
```js
// test.js



function test() {
  return "this is a test";
}

exports.test = test;

// module.exports.test = test;
```

```js
// index.js
const test = require("./test");

consoel.log(test.test());
// this is a test
```

从使用不难看出，默认的输出，就是module.exports指向的对象(既此时的exports变量)。

所以若想设定模块的默认输出，只需改变module.exports的指向即可

```js
// test.js
module.exports = "this is a test";

```
```js
// index.js

const test2 = require("./test2");

console.log(test2);

// this is a test
```

但此方法有一个缺陷就是 **会导致exports变量失效**

```js
// test3.js

function testFunc () {
  return "from variable exports";
}

exports.testFunc = testFunc;

module.exports = "from default exports";
```

```js
// index.js

const test3 = require("./test3");


try {
  console.log(test3);
  console.log(test3.testFunc);
} catch(e) {
  console.error(e);
}


// from default exports
// TypeError testFunc is not a function
```
