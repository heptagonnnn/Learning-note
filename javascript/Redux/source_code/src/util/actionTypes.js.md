```JavaScript
/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.

 * 这些是Redux的私有保留action type
 * 对于任何未知的action，你必须返回当前state
 * 如果当前state没有定义，则必须返回初始state
 * 不要直接在你的代码里直接引用这些action type
 */


/*
函数流程：
生成随机数-->进行36进制转换-->截取从index=7的到末尾的字符-->字符间用"."分割
*/
const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7)
    .split('')
    .join('.')


/*
redux保留的Action type
*/
const ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
  REPLACE: `@@redux/REPLACE${randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
}

export default ActionTypes
```
