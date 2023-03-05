const nums = [10, 20, 30, 40, 50];

const sum = nums.reduce((acc, cur) => {
  acc = acc + cur;
  return acc;
}, 0);

console.log(sum);

const avg = nums.reduce((acc, cur, i, arr) => {
  acc = acc + cur / arr.length;
  return acc;
}, 0);

console.log("avg", avg);

console.log("AVG", sum / nums.length);

const nums2 = [1, 2, 3, 4, 5];

let arr = [];
for (let number of nums2) {
  arr = [number, ...arr];
}

console.log("ARR", arr);

const arr1 = nums2.reduce((acc, cur) => {
  acc = [cur, ...acc];
  return acc;
}, []);

console.log("ARR1", arr1);

const rightarr = nums2.reduceRight((acc, cur) => {
  acc = [...acc, cur];
  return acc;
}, []);

const groups = [
  [3, 2],
  [2, 5],
  [3, 7],
];

const groupArr = groups.reduce((arr, [count, value]) => {
  for (let i = 0; i < count; i++) {
    arr.push(value);
  }
  return arr;
}, []);
console.log(groupArr);

const groupArr1 = groups.reduce((arr, [count, value]) => {
  arr = [...arr, ...Array(count).fill(value)];
  return arr;
}, []);
console.log(groupArr1);

const numbers = [12, 15, 12, 2, 6, 6, 2, 12];

const resultObj = numbers.reduce((obj, cur) => {
  obj[cur] = (obj[cur] ?? 0) + 1;
  return obj;
}, {});

console.log(resultObj);

function geyById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Got", id);
      resolve(id);
    }, 1000);
  });
}

const ids = [10, 20, 30];

ids.reduce(async (promise, id) => {
  await promise;
  return geyById(id);
}, Promise.resolve());
