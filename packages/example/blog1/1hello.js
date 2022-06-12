const target = {
  someProp: 1
}

const handler = {
  get: function(target, key) {
      return key in target ? 
      target[key] : 
      'Doesn\'t exist!';
  }
}

const proxy = new Proxy(target, handler);
console.log(proxy.someProp) // 1
console.log(proxy.someOtherProp) // Doesn't exist!