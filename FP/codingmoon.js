const log = console.log;

const arr = [1, 2, 3, 4, 5];

const sum = (x, y) => x + y;

const result = arr.reduce(sum);

const average = (sum, val, i, arr) => {
  sum += val;
  return i === arr.length - 1 ? sum / arr.length : sum;
};

const avg = arr.reduce(average);

const arr2 = [20, 50, 40, 80, 70];

const maxNum = (pre, cur) => {
  return pre < cur ? cur : pre;
};

const max = arr2.reduce(maxNum);

// ---------------------------------------------------

const a = [15, 30, 100];

const result2 = arr.map((value) => {
  return value.toFixed(2);
});

log(result2);

const citys = [
  {
    city: "seoul",
    temp: 86,
  },
  {
    city: "london",
    temp: 92,
  },
];

const toCecius = (obj) => {
  return {
    ...obj,
    temp: Math.floor((5 / 9) * obj.temp - 32),
  };
};

const res = citys.map(toCecius);

log(res);

const range = (start, stop) => {
  return new Array(stop - start).fill(0).map((v, i) => start + i);
};

log(range(1, 10));

// ------------------------------------------------------

const arr3 = [1, 2, 3, 4, 5];

const isEven = (n) => n % 2 === 0;

const evenNums = arr3.filter(isEven);

console.log(evenNums);

const values = [1, "", 2, undefined, 3, 4];

const filterd = values.filter((value) => Boolean(value));

log(filterd);

const users = [
  {
    name: "hwan",
    age: 24,
    gender: "male",
  },
  {
    name: "hwan5",
    age: 30,
    gender: "female",
  },
  {
    name: "hwan1",
    age: 27,
    gender: "male",
  },
  {
    name: "hwa6n",
    age: 35,
    gender: "female",
  },
];

const olderThan30 = (user) => user.age >= 30;
const isFemale = (user) => user.gender === "female";

const result3 = users.filter(olderThan30).filter(isFemale);

log(result3);

const byProperty = (prop, fn) => {
  return (user) => {
    return user.hasOwnProperty(prop) && fn(user[prop]);
  };
};

const result4 = users.filter(byProperty("age", (age) => age >= 30));

log(result4);

// ------------------------------------------------------

function FnC(x, y) {
  return x + y;
}

function CarriedFn(x) {
  return function (y) {
    return x + y;
  };
}

log(FnC(1, 2));
log(CarriedFn(1)(2));

function makeCoffee(roastType) {
  return function (sugar) {
    return function (cream) {
      log(`Coffee ${roastType} ${sugar} ${cream}`);
    };
  };
}

log(makeCoffee("DarkLost")(1)(2));

const mediumLost = makeCoffee("mediumLost");

log(mediumLost(1)(2));
log(mediumLost(3)(5));

// -----

const title = "Learning Function Composition 1";

const strToArr = (str) => str.split(" ");
const toLower = (arr) => arr.map((w) => w.toLowerCase());
const joinWithDash = (arr) => arr.join("-");

const slug1 = joinWithDash(toLower(strToArr(title)));

log(slug1);

const compose =
  (...fns) =>
  (input) => {
    return fns.reduceRight((acc, fn) => fn(acc), input);
  };

const pipeline =
  (input) =>
  (...fns) => {
    return fns.reduce((acc, fn) => fn(acc), input);
  };

const slug2 = compose(joinWithDash, toLower, strToArr)(title);

log(slug2);

const slug3 = pipeline(title)(strToArr, toLower, joinWithDash);

log(slug3);

console.log(slug1 === slug2);
console.log(slug1 === slug3);