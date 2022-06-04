import ExpiredCache from "./ExpiredCache"

// // 生成key值错误
// const generateKeyError = new Error("Can't generate key from name and argument")

// // 生成key值
// function generateKey(name, argument) {
//   // 从arguments 中取得数据然后变为数组
//   const params = Array.from(argument).join(',')

//   try {
//     // 返回 字符串，函数名 + 函数参数
//     return `${name}:${params}`
//   } catch (_) {
//     // 返回生成key错误
//     return generateKeyError
//   }
// }

const getApiData = (url) => {
  if (url === "/data") return Promise.reject(`get ${url} failed`)
  return fetch(url).then(res => res.json())
}

const getBackData = async () => {
  const getData = async (url) => {
    const urlIsArray = Array.isArray(url)
    // 统一化处理数据，无论是字符串还是数组均视为数组
    const urls = urlIsArray ? url : [url]

    // 获取所有的 请求服务
    const promises = []

    urls.forEach(url => {
      // 利用promise 
      // console.log('>>> get before', ExpiredCache.cacheMap);
      let promise = ExpiredCache.get(url)
      console.log('>>> promise', url, promise);

      if (promise) {
        // 如果 缓存中有，直接push
        promises.push(promise)
      } else {
        promise = getApiData(url).catch(error => {
          // 在请求回来后，如果出现问题，把promise从cache中删除
          ExpiredCache.delete(url)
          return Promise.reject(error)
        })
        // console.log('>>> set', url);
        ExpiredCache.set(url, promise)
        // console.log('>>> set after',  ExpiredCache.cacheMap);
        promises.push(promise)
      }
    })

    return Promise.all(promises).then(res => {
      // 根据传入的 是字符串还是数组来返回数据，因为本身都是数组操作
      // 如果传入的是字符串，则需要取出操作
      return urlIsArray ? res : res[0]
    })
  }

  const data1 = getData("/book")
  // 第二次调用 不会去取 book，只会去data
  const data2 = getData(["/data", "/book"])

  data1.then(console.log)
  data2.then(console.log)

  // const res = await Promise.all([data1, data2])
  // const data2 = await getData("/book")
  // console.log(data2)
}


export default getBackData