// // function* Generator() {
// //   yield 1;
// //   yield 2;
// //   yield 3;
// // }

// // const generator = Generator();

// // console.log(generator.next());
// // console.log("다른 작업 1");
// // console.log(generator.next());
// // console.log("다른 작업 2");
// // console.log(generator.next());
// // console.log("다른 작업 3");
// // console.log(generator.next());

// const a = [1, 2, 3];

// const iterator = a[Symbol.iterator]();

// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// const test = {
//   [Symbol.iterator]: function () {
//     let i = 0;
//     return {
//       next: function () {
//         if (i > 5) {
//           return { value: undefined, done: true };
//         }
//         return { value: i++, done: false };
//       },
//     };
//   },
// };

// console.log(test);

// // const iter = test[Symbol.iterator]();

// for (const i of test) {
//   console.log(i);
// }

// console.log([...test]);

const a = [1, 2, 3, 4, 5];

for (const i of a) {
  console.log(i);
}

a[Symbol.iterator] = function () {
  let i = 100;
  return {
    next: function () {
      if (i < 5) {
        return { value: undefined, done: true };
      }
      return { value: i--, done: false };
    },
  };
};

const iter = a[Symbol.iterator]();

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

for (const i of a) {
  console.log(i);
}
