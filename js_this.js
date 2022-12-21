const a = [1, 2, 3, 4, 5];

const as = a.forEach((el, i) => {
  a[i] = a[i] * 2;
});

console.log(as);

const c = a.map((el) => el * 2);
console.log(c === a);
