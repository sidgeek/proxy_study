
const withZeroValue = (target, zeroValue) => new Proxy(target, {
  get: (obj, prop) => (prop in obj) ? obj[prop] : zeroValue
})

let pos = {
  x: 4,
  y: 19
}

console.log(pos.x, pos.y, pos.z) // 4, 19, undefined

pos = withZeroValue(pos, 0)

console.log(pos.x, pos.y, pos.z) // 4, 19, 0
