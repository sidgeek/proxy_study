const getBackData = async () => {
  const getData = (url) => fetch(url)
    .then(res => res.json())


  const data1 = await getData("/data")
  console.log(data1)
  const data2 = await getData("/book")
  console.log(data2)
}


export default getBackData