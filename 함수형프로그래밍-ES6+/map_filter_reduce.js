const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "반바지", price: 15000 },
  { name: "핸드폰케이스", price: 25000 },
  { name: "후드티", price: 40000 },
  { name: "긴바지", price: 30000 },
];

const map = (f, iter) => {
  const res = [];
  for (let a of iter) {
    res.push(f(a));
  }
  return res;
};

const filter = (f, iter) => {
  const res = [];
  for (let a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

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

const add = (a, b) => a + b;

const res = reduce(
  (a, b) => a + b,
  map(
    (product) => product.price,
    filter((product) => product.price <= 20000, products)
  )
);

console.log(res);

console.log(
  reduce(
    add,
    map((p) => p.price, products)
  )
);
