const log = console.log;

const arr = {};

arr[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

const iter = arr[Symbol.iterator]();

for (let ar of arr) {
  console.log(ar);
}

log(...iter);
