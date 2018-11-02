# src/createStore.js


create作为redux的核心部分，用于生成store树

```JavaScript

// 用于订阅数据的库，看文档，好像类似于RxJS
import $$observable from 'symbol-observable'



// Redux保留的Action type
import ActionTypes from './utils/actionTypes'
// 检测简单对象
import isPlainObject from './utils/isPlainObject'

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *




 * 创建一个Redux store对象， 用于保存state树。
 * 唯一一个可以改变store中数据的方法，就是调用它当中的"dispatch()"方法
 * 在你的app中，应该只有唯一一个store。为了区分state树中，不同部分对action的反馈，你需要使用combineReducers将众多reducer合并盛一个


 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.



 * 已当前state树和action作为参数，返回新的state




 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *


 * 初始state，可选参数，用于合并从服务端传来的state，或是存储之前的序列化用户会话
 * 如果你使用 'combineReducers' 来生成根reducer函数，这个参数必须是一个类combineRducers对象



 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *

 * 增强器 可选参数，用于存储第三方容器，诸如中间件, time travel 持久化等， 唯一可以将增强器挂载进redux的方法，便是通过'applyMiddleware()'


 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 *


 *返回一个Redux store对象，你可以从中访问到state， dispatch action 并且可以订阅 变化
 */
export default function createStore(reducer, preloadedState, enhancer) {
  /*
  用于检测参数列表合法性----只允许有一个代表enhancer的变量
  1. 若第二个参数是函数（即第二个参数已经代表enhancer），第三个参数也是函数，则说明有两个表示enhancer的变量
  2. 第三个参数是函数且第四个参数也是函数，也不符合参数列表要求
  */
  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function'
    )
  }

  /*
  用于判断是否有preloaded
  若preloaded位是一个函树，且没有第三个参数
  则preloaded位传入的是enhancer
  */

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }


  /*
  如果 enhancer位不是函数
  对createStore方法进行加强
  */
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }

  /*
  若reducer位不是函数
  */

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false

  function ensureCanMutateNextListeners() {

    // 制作snapshot？？？
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }

    return currentState
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
   /*
   添加一个变化监听器。当有action被dispatch时，他就会被调用，然后state树就有可能会发生改变。
   你可以在回调函数中调用getState方法获取当前的state树。

   当你在一个变化监听器中调用dispatch方法时，可能会收到下列警告

   1. 在每一个dispatch方法调用前，订阅内容都会被进行快照。
    如果你在监听器被触发时订阅/解除订阅，都不会对正在进行中的dispatch方法产生任何影响。
    然而，对于下一个dispatch方法调用，无论是否嵌入，都将会使用订阅列表里最新的快照

   2. 监听器不应该被寄予期望可以监控到所有的state变化，
    在监听器被调用之前，state可能已经被嵌入的dispatch方法更新了很多次了。
    然而可以保证的是，在dispatch方法之前注册的订阅器，都可以接收到最新的statte



    调用该方法时会制作一个Listners列表的快照，然后将新的Listner放入新的列表
    返回一个取消订阅函数，再取消订阅时，也会生成一个快照，然后在新的列表里将listener找到并删除

   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }

    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
      )
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
        )
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *


   * dispatch一个action，是唯一一个可以触发state变化的方法。

   * 用于创建store的reducer函数，在当前state树被触发action时，将会被调用。
   * 它的返回值将会被当作 “下一个” state树，并且变化监听器将会被通知

   * 基础实现只支持简单对象action。如果你想dispatch一个promise，一个Observable，一个thunk或者其他
   * 你需要用对应的中间件包裹你的store创建函数。
   * 例如， 看看redux-thunk包的文档
   * 即使如此，中间件最终也是以dispatch简单对象Action来使用此方法


   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *

   * 参数action
   * 一个代表了“什么被改变”的简单函数，保持action序列化是个好主意，如此一来，你就可以记录和重现用户会话
   * 或者使用时间旅行“redux-devtools”。一个action必须有type属性，并且不能为undefined
   * 使用const声明的字符串常量是个好方法




   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).


   * 方便起见，返回action
   * 但若使用了中间件，则可能会返回其他内容，比如promise






   * 从源码可以看出，listener列表只有在dispatch执行时才会更新
   * 所以前文才会说，dispatch后注册的register可能不能收到完整的更新，原因于此
   */
  function dispatch(action) {
    // 若action 不是简单Object
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
          'Use custom middleware for async actions.'
      )
    }

    // 若action.type为undefined

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      )
    }

    // 若正在dispatch中
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      // !!!!核心，通过reducer函数，生成新的state数
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }


    // 将新的监听器列表覆盖旧的，并通知所有监听器更新数据
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *

   * 此函数用于更新reducer
   *
   * 主要用于动态生成reducer，或者热加载机制？？？ 这两个还没遇到过.....
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.REPLACE })
  }




  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable

   * 与响应式/流 第三方库进行交互
   * 返回一个可观测对象
   *
   *
   *
   */
  function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.')
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      }
    }
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.

  /*
  当store被创建后，就会dispatch一个INIT方法，所有的reducer都会return他们的初始值，高效的挂载在初始state树上
  */
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}

```
