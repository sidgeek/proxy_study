const cache = {
  'John': ['55', '99']
}
const handler = {
  get: function (target, player) {
    if (target[player]) {
      return target[player]
    } else {
      fetch('some-api-url')
        .then((scoreboard => {
          target[player] = scoreboard
          return scoreboard
        }))
    }
  }
}
const proxy = new Proxy(cache, handler)

/**
 *  这里没有运行,主要提供思路, 通过proxy 可以实现缓存，但这种方式其实不常用
 *  更常用的是对函数进行缓存, 在handler中实现apply方法
 */

const getData = (url) =>
  fetch(url)
    .then((res => res.json()))


const cacheMap = new Map()
const handler2 = {
  apply: function (target, thisArg, argsList) {
    const currentCache = this.cacheMap
    let cacheKey = argsList.toString();
    // 当前没有被缓存，执行调用，添加缓存

    if (!currentCache.has(cacheKey)) {
      let result = target.apply(thisArg, argsList)

      // 如果是 promise 则缓存 promise，简单判断！ 
      // 如果当前函数有 then 则是 Promise
      if (result?.then) {
        result = Promise.resolve(result).catch(error => {
          // 发生错误，删除当前 promise，否则会引发二次错误
          // 由于异步，所以当前 delete 调用一定在 set 之后，
          currentCache.delete(cacheKey)

          // 把错误衍生出去
          return Promise.reject(error)
        })
      }
      currentCache.set(cacheKey, result);
    } else if (!currentCache.has(cacheKey)) {
      currentCache.set(cacheKey, target.apply(thisArg, argsList));
    }

    // 返回被缓存的数据
    return currentCache.get(cacheKey);
  }

}
const proxy2 = new Proxy(cache, handler2)