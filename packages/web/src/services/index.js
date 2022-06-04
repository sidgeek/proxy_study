
const promiseCache = new Map()

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
      let promise = promiseCache.get(url)

      if (promise) {
        // 如果 缓存中有，直接push
        promises.push(promise)
      } else {
        promise = getApiData(url).catch(error => {
          // 在请求回来后，如果出现问题，把promise从cache中删除
          promiseCache.delete(url)
          return Promise.reject(error)
        })
        promiseCache.set(url, promise)
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
  const data2 = getData(["/data","/book"]) 

  data1.then(console.log)
  data2.then(console.log)

  // const res = await Promise.all([data1, data2])
  // const data2 = await getData("/book")
  // console.log(data2)
}


export default getBackData