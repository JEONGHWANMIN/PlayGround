const array1 = ["a", "b", "c"];
const iterator = array1.values();

const iter = array1[Symbol.iterator]();
console.log(iterator);

for (const value of iterator) {
  console.log(value);
}
