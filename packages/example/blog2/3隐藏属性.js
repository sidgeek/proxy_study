const hide = (target, prefix = '_') => new Proxy(target, {
  has: (obj, prop) => (!prop.startsWith(prefix) && prop in obj),
  ownKeys: (obj) => Reflect.ownKeys(obj)
    .filter(prop => (typeof prop !== "string" || !prop.startsWith(prefix))),
  get: (obj, prop, rec) => (prop in rec) ? obj[prop] : undefined
})

let userData = hide({
  firstName: 'Tom',
  mediumHandle: '@tbarrasso',
  _favoriteRapper: 'Drake'
})

console.log(userData._favoriteRapper);  // undefined
console.log(('_favoriteRapper' in userData)); // false
console.log(Object.keys(userData));  // ['firstName', 'mediumHandle']

