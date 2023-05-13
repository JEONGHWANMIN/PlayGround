const products = [
  { name: "반팔티", price: 15000, quantity: 1 },
  { name: "긴팔티", price: 20000, quantity: 2 },
  { name: "핸드폰케이스", price: 15000, quantity: 3 },
  { name: "후드티", price: 30000, quantity: 4 },
  { name: "바지", price: 25000, quantity: 5 },
];

const go = (...fs) => fs.reduce((item, fs) => fs(item));

const pipe =
  (...fs) =>
  (a) =>
    go(a, ...fs);

const add = (arr) => arr.reduce((a, b) => a + b);

const totalQuantity = pipe(
  (products) => products.map((product) => product.quantity),
  (quantitys) => add(quantitys)
);

console.log(totalQuantity(products));

const totalPrice = pipe(
  (products) => products.map((product) => product.price * product.quantity),
  (prices) => add(prices)
);

console.log(totalPrice(products));
