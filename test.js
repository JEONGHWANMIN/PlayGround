const arr = [1, 2, 3, 4, 5];

const iter = arr[Symbol.iterator]();

for (let i of iter) {
  console.log(i);
}

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

for (let i of iter) {
  console.log("여기도 돌까?", i);
}
