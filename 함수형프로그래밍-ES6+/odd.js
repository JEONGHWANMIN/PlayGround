function* Infinity(i = 0) {
  while (true) yield i++;
}

function* odd(limit) {
  for (let a of Limit(limit, Infinity(1))) {
    if (a % 2) yield a;
  }
}

function* Limit(limit, iter) {
  for (let a of iter) {
    yield a;
    if (limit == a) return;
  }
}

const iter1 = Infinity();

// console.log(iter1.next());
// console.log(iter1.next());

const iter2 = odd(10);

for (let a of odd(20)) console.log(a);

console.log("==================");

const iter3 = Limit(4, [1, 2, 3, 4, 5, 6, 7]);

// console.log(iter3.next());
// console.log(iter3.next());
// console.log(iter3.next());
// console.log(iter3.next());
// console.log(iter3.next());
// console.log(iter3.next());

function* TEST() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

console.log("TEST START");

for (let a of TEST()) console.log(a);

console.log(...TEST());
