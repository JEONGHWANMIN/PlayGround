// 각 자리 인덱스에 맞는 숫자 리턴
function getDigit(number, idx) {
  let strNum = number + '';

  return strNum[strNum.length - 1 - idx]
    ? Number(strNum[strNum.length - 1 - idx])
    : 0;
}

// 자릿수 return
function digitCount(num) {
  let strNum = num + '';
  if (strNum.includes('-')) {
    return Number(strNum.length) - 1;
  }
  return Number(strNum.length);
}

// 가장 큰 자릿수 return
function mostDigits(numArray) {
  let maxDigits = 0;
  for (let i = 0; i < numArray.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(numArray[i]));
  }
  return maxDigits;
}

function RadixSort(arr) {
  let maxDigitsCount = mostDigits(arr);
  for (let k = 0; k < maxDigitsCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    for (let j = 0; j < arr.length; j++) {
      let digit = getDigit(arr[j], k);
      digitBuckets[digit].push(arr[j]);
    }
    console.log('original >>> ', digitBuckets);
    let newBuckets = [].concat(...digitBuckets);
    console.log('newBucket >>> ', newBuckets);
  }
  return newBuckets;
}
// getDigit(12345,0) -> return 5
// console.log(getDigit(7323, 7));
// console.log(digitCount(-21366));
// console.log(mostDigits([2, 22, 321, 2342]));
console.log(RadixSort([23, 421, 26, 527, 32, 600]));
