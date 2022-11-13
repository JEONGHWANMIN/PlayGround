var MedianFinder = function () {
  this.arr = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  this.arr.push(num);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  // [1,2,3,4]
  this.arr.sort((a, b) => a - b);
  const idx = Math.floor(this.arr.length / 2);
  // 짝수일 때 [1,2,3,4]
  if (this.arr.length % 2 === 0) {
    console.log(this.arr[idx], this.arr[idx - 1] / 2);
    const median = (this.arr[idx] + this.arr[idx - 1]) / 2;
    return median;
  }
  // 홀수일 때
  return this.arr[idx];
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

const obj = new MedianFinder();
obj.addNum(1);
obj.addNum(2);
obj.addNum(3);
obj.addNum(4);
console.log(obj.findMedian());
