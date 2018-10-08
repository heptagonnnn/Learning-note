# scss

[toc]
## 变量 variable

### 变量声明


声明css值
    $variable-name: css-value;

    ```scss
    $red: red;
    $highlight: #white;
    ```

### 变量引用
    ```scss
    $red: red;
    $highlight: #white;



    background: $red;

    // 1. 可以通过变量的嵌套，完成细粒度的划分
    $highlight-border: 1px solid $highlight




    // 2. 变量声明有作用域规则，代码块外不能调用代码块内的变量

    $mid: 10px;

    .box {
      $small: 5px;

      border: $small solid red;
      padding: $mid;
    }

    //error 不可调用其他代码块的内部变量
    .outer {
      padding: $small;
    }
    ```

## 嵌套css规则

层层展开，转换为等价的css结构
！！！注意，scss样式结构，本质是css选择器，不能视为严格的dom结构

```scss
.grand {
  .parent {
    .child {
      color : red;
    }
  }
}
// 编译为

.grand .parent. child {
  color: red;
}

//绝不可理解为只能匹配一下dom结构
<div class="grand">
  <div class="parent">
    <div class="child">child</div>
  </div>
</div>

// 以下结构样式依然生效
<div class="grand">
  <div class="parent">
    <div class="parent">
        <div class="child">child</div>
    </div>
  </div>
</div>
```

### 父选择器标识符 &

用于完整替代父选择器，而不进行嵌套解析

```scss

.parent {
  color: red;
  &:hover {
    color: blue;
  }
}

// 解析为
.parent {
  color: red;
}
.parent: hover {
  color: blue;
}
```

### 群组选择器嵌套
用于解析使用“，”分割的群组样式选择器

```scss
.parent1, .parent2 {
  color: red;
}

//解析为
.parent1, .parent2 {
  color: red;
}


.parent {
  .child1, .child2 {
    color: red;
  }
}


//解析为

.parent child1, .parent child2 {
  color: red;
}
```


### 子组合选择器和同层组合选择器: >, +, ~

```scss
article {
  ~ article {
    color: red;
  }

  > section {
    color: blue;
  }

  dl > {
    dt {
      color: yellow;
    }
    dd {
      color: green;
    }
  }

  nav + & {margin-top: 0}
}
```


###  嵌套属性
讲一些中划线连接的属性名，进行嵌套解析，如border系列，background 系列

但是这样做是不是会影响对scss的依赖度，以及对原生的熟悉，有待商榷

```
nav {
  border: 1px solid red {
    left: 0px;
    right: 0px;
  }
}
// 编译为
nav {
  border: 1px solid red;
  border-left: 0px;
  border-right: 0px;
}
```

## 导入sass/scss文件

使用@import关键字

### 局部文件

当文件名为_开头时，表示此文件不需要被单独打包成一个css文件，而是调用文件一起打包进一个文件


### 默认变量值
对于反复声明的变量，只有最后一次声明有效

```scss
$red: red;
$red: blue;
// blue生效
```

当引入的文件中，与调用文件中，有同名变量时，局部文件内的变量会覆盖外部的变量

```scss
// index.scss

$red: red;
.color {
  color: red;
}


// test.scss

@import("./index.scss");

$red: blue;


// 实际颜色为red;
```
通过!default关键字可以将局部文件内的变量作为默认值使用，若外部声明了同名变量，则会对局部文件内部的变量进行覆盖，若未声明，则使用局部文件自己的变量


```scss

// index.scss
$red: red!default;
.color {
  color: red;
}

// test.scss

$red: blue
@import("./index.scss")


//实际为blue
```


### 嵌套导入

可以在css规则内使用@import
```scss

// index.scss
.child {
  color: red;
}



// test.scss
.parent {
  @import ("./index.scss");
}


// 等同于

.parent {
  .child {
    color: red;
  }
}
```


### 原生css导入

在使用css原生的@import时，会导致额外下载，若想使用原生的@import，只有在一下3种情况可以触发

1. .css后缀文件
2. 绝对路径
3. 被导入内容的是一个url()值


如需要使用scss导入css文件，将css文件后缀改为scss即可，可以做到完全兼容
