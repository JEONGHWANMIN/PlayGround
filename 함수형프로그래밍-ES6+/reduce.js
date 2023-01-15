const add = (a, b) => a + b;

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (let a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

console.log(reduce(add, 0, [1, 2, 3, 4, 5]));
console.log(reduce(add, [1, 2, 3, 4, 5]));

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "반바지", price: 15000 },
  { name: "핸드폰케이스", price: 25000 },
  { name: "후드티", price: 40000 },
  { name: "긴바지", price: 30000 },
];

const addPrice = (acc, obj) => {
  return acc + obj.price;
};

console.log(reduce(addPrice, 0, products));
