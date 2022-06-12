// 1. Validation
const productDescs = {}
const handler = {
    set: function(target, key, value) {
        if(value.length > 10) {
            value = value.substring(0, 10)
        }
        target[key] = value
    }
}
const proxy = new Proxy(productDescs, handler)

// 限制了复制的最大length
// proxy.data = "123456789012345"
// console.log(proxy.data);

// 2. Providing a read-only view of an object
const importantData = {
  name: 'John Doe',
  age: 42
}

const handler2 = {
  set: 'Read-Only',
  defineProperty: 'Read-Only',
  deleteProperty: 'Read-Only',
  preventExtensions: 'Read-Only',
  setPrototypeOf: 'Read-Only'
}

const proxy2 = new Proxy(importantData, handler2)
// proxy2.name = "sss" // error
// console.log(proxy2.name);

// 3. Private properties
const object = {
  _privateProp: 42
}

const handler3 = {
  has: function(target, key) {
      return !(key.startsWith('_') && key in target)
  },
  get: function(target, key, receiver) {
      return key in receiver ? target[key] : undefined
  }
}

const proxy3 = new Proxy(object, handler3)
proxy._privateProp // undefined


