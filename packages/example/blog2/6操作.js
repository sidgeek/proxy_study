const range = (min, max) => new Proxy(Object.create(null), {
  has: (_, prop) => (+prop >= min && +prop <= max)
})

const X = 10.5
const nums = [1, 5, X, 50, 100]
console.log(X in range(1, 100)); // true

const res= nums.filter(n => n in range(1, 10))
console.log(res);  // [1, 5]