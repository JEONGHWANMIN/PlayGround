const log = console.log;

const go = (...fs) => {
  return reduce((acc, f) => f(acc), fs);
};

const curry = (f) => {
  return (a, ...args) => {
    if (args.length) {
      return f(a, ...args);
    } else {
      return (...rest) => {
        return f(a, ...rest);
      };
    }
  };
};

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

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (let a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

// range

const range = (l) => {
  let i = -1;
  const res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};

L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

const list = L.range(4);

const sum = (a, b) => a + b;

// log(reduce(sum, list));

// take

const add = (a, b) => a + b;

const take = curry((l, iter) => {
  let res = [];

  for (let a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }

  return res;
});

go(L.range(10000), take(5), reduce(add), log);

// L.map

L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
};

const it = L.map((item) => item + 1, [1, 2, 3]);

log([...it]);
