# redux 笔记


[toc]
[官方文档](https://www.redux.org.cn/)

本文不是redux使用文档，只是对文档的一些个人见解，可能不涉及api及具体用法,有可能会设计源码

## redux动机

redux诞生的初衷，是为了解决js的状态管理问题

但是因为react-redux技术栈的普及，所以目前redux的主要使用场景仍是在react框架下

react的主要问题是，太过于轻量，对于一些复杂场景，工程复杂度和难度都会极速上升。主要的表现点，则是状态管理，组件间的交互，数据的协调。

而由于redux是对状态管理方面的出色表现，很自然的解决了这三个问题。

但react-redux技术栈的缺点也是明显的，工程目录过于复杂。

于是有了react-redux的阿里巴巴版最佳实践----dva，本文不做介绍

## redux三大原则

### 单一数据源

整个应用的state都被存储在一个object tree中，并且这个object tree只存在于唯一一个store中

存储在一个store中有以下优点

1. 数据共享，不同组件可以调用相同的数据源

2. 实时更新，store中的数据更新时，所以连接进redux的组件都会收到更新


### state是只读的
唯一改变state的方法就是触发action，action是一个用于描述已发生事件的普通对象

由于state时只读的，所以在对state操作时，才可以保证数据的可靠性


### 使用纯函数进行修改

为了描述action 如何改变state tree，就需要便血reducers

而reducer是没有副作用的纯函数，他们接受旧的state，返回新的state，，让每一次action都可追溯，从而保证state中数据的可靠性


## 基础

此章为个人总结，并未按照官方文档


首先要明确的一点是
Action只是一个包含动作信息，和新state信息的plain object
Reducer只是一个将旧的state与Action中的state信息归并为新的state的纯函数

这两者并没有什么特殊之处（magic）

真正让他们发挥作用的是store
```
至于如何发挥作用
目前的猜测是通过createStore的方式，将reducer注册进redux体系，
当dispatch一个action时，遍历执行注册过的reducer函数，然后将新的state输出
```




## 词汇表


### Action
Action是一个普通对象，用来表示即将改变state的意图。它是将数据放入store的唯一途径。


FSA---Flux Standard Action

FSA是Flux对Action结构的规范，并非强制执行，只是一种最佳实践

由于redux是基于Flux的，所以也推荐依照FSA标准

[Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)


FSA标准中，Action由四部分组成

```JavaScript
{
  // 用于表示Action的type，
  // type type = String
  type: "ADD_LIST",
  /* 用于表示是Action的负载信息
   type payload = any
   若error字段为true时，则payload必须为一个new Error()
   */
  payload: {} || new Error(),
  /* 用于表示Action是否为一个错误Action
  type error any
  */
  error: true || any,
  /*
  其他任何信息
  type meta = any
  */
  meta: {}
}
```
对于Error要如何处理，目前的方案可以考虑为写一个middleware来拦截有报错的action


### Reducer ---- 归并


type Reducer<S, A> = (state: S, action: A) => S
Reducer（也被称为reducing function）函数接受两个参数：之前累计运算的结果和当前被累积的值，返回的是一个新的累积结果。该函数把一个集合归并成一个单值


此处把reduce翻译成归并简直是妙啊

Reducer必须是纯函数，不应该产生任何副作用

### dispatch
