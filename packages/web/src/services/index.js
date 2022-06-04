const getData = () => {
  fetch("/data").then(res => {
    console.log(">>> getData:", res);
  })
}

export default getData