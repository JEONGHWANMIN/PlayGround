const log = console.log;

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();

for (let a of iterable) {
  log(a);
}

log("==================");

let iter = iterable[Symbol.iterator]();

iter.next();

for (let a of iter) log(a);
