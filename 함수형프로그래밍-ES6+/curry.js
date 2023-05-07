const curry = (f) => {
  return (a, ...args) => {
    if (args.length) {
      return f(a, ...args);
    } else {
      return (...rest) => {
        console.log("Rest", rest);
        return f(a, ...rest);
      };
    }
  };
};

const mult = curry((a, b) => a * b);

console.log(mult(2)(8));
console.log(mult(2, 10));
