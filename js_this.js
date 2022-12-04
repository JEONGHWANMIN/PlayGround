const a = [1, 2, 3, 4, 5];

a.forEach((el, i) => {
  a[i] = a[i] * 2;
});

console.log(a);

const c = a.map((el) => el * 2);
console.log(c);
