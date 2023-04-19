const log = console.log;

const arr = [1, 2, 3, 4, 5];

const sum = (x, y) => x + y;

const result = arr.reduce(sum);

log(result);

const average = (sum, val, i, arr) => {
  sum += val;
  return i === arr.length - 1 ? sum / arr.length : sum;
};

const avg = arr.reduce(average);
log(avg);

const arr2 = [20, 50, 40, 80, 70];

const maxNum = (pre, cur) => {
  return pre < cur ? cur : pre;
};

const max = arr2.reduce(maxNum);
log(max);
