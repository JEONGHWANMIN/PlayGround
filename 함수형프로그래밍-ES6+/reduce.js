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
