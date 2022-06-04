
const promiseCache = new Map()

const getBackData = async () => {
  const getData = async (url) => {
    let promise = promiseCache.get(url)

    if (!promise) {
      // 没有数据请求服务器, 没有await 返回的是promise
      promise = fetch(url).then(res => res.json())
      // 设置数据缓存
      promiseCache.set(url, promise)
    }
    return promise
  }
  
  const data1 = getData("/data")
  const data2 = getData("/data")

  const res = await Promise.all([data1, data2])
  console.log(res)
  // const data2 = await getData("/book")
  // console.log(data2)
}


export default getBackData