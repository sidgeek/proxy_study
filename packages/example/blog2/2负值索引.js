const negativeArray = (els) => new Proxy(els, {
  get: (target, propKey, receiver) => Reflect.get(target,
    (+propKey < 0) ? String(target.length + +propKey) : propKey, receiver)
});


const unicorn = negativeArray(['🐴', '🎂', '🌈']);

console.log(unicorn[-1]);
 // '🌈'