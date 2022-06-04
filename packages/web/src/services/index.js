
const dataCache = new Map()

const getBackData = async () => {
  const getData = async (url) => {
    let data = dataCache.get(url)

    if (!data) {
      // 没有数据请求服务器
      data = await fetch(url).then(res => res.json())
      // 设置数据缓存
      dataCache.set(url, data)
    }
    return data
  }
  
  const data1 = getData("/data")
  const data2 = getData("/data")

  const res = await Promise.all([data1, data2])
  console.log(res)
  // const data2 = await getData("/book")
  // console.log(data2)
}


export default getBackData