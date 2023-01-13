const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "반바지", price: 15000 },
  { name: "핸드폰케이스", price: 25000 },
  { name: "후드티", price: 40000 },
  { name: "긴바지", price: 30000 },
];

const filter = (f, iter) => {
  const res = [];
  for (let a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const res = filter((item) => item.name !== "반팔티", products);

console.log(res);
