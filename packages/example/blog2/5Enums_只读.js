// 只读
const NOPE = () => {
  throw new Error("Can't modify read-only view");
}

const NOPE_HANDLER = {
  set: NOPE,
  defineProperty: NOPE,
  deleteProperty: NOPE,
  preventExtensions: NOPE,
  setPrototypeOf: NOPE
}

// 只读枚举
const readOnlyView = target =>
  new Proxy(target, NOPE_HANDLER)

const createEnum = (target) => readOnlyView(new Proxy(target, {
  get: (obj, prop) => {
    if (prop in obj) {
      return Reflect.get(obj, prop)
    }
    throw new ReferenceError(`Unknown prop "${prop}"`)
  }
}))


let SHIRT_SIZES = createEnum({
  S: 10,
  M: 15,
  L: 20
})

console.log(SHIRT_SIZES.S);  // 10
// SHIRT_SIZES.S = 15

// Uncaught Error: Can't modify read-only view

// SHIRT_SIZES.XL

// Uncaught ReferenceError: Unknown prop "XL"