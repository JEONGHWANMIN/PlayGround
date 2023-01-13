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

const res = map((item) => item.price, products);

console.log(res);
