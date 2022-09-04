class SuperArray extends Array {
  maxLength() {
    let max = this[0];
    for (let i = 1; i < this.length; i++) {
      if (max.length < this[i].length) {
        max = this[i];
      }
    }
    return max.length;
  }
  removeOverlap() {
    let set = new Set(this);
    return new Array(...set);
  }
}

const superArray = new SuperArray(
  'HwanMin',
  'HwanMin',
  'SuperHwanMin',
  '안녕하세요반갑습니다ㅎㅎ!!!!'
);

console.log(superArray.maxLength());
console.log(superArray.removeOverlap());
