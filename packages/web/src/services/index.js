
const getBackData = async () => {
  const getData = (url) => fetch(url)
    .then(res => res.json())
    .then(console.log)


  await getData("/data")
  await getData("/book")
}



export default getBackData