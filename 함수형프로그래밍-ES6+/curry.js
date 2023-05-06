const curry =
  (f) =>
  (a, ..._) => {
    return _.length ? f(a) : (..._) => f(a, ..._);
  };

const mult = curry((a, b) => a * b);

console.log(mult(2)(5));
