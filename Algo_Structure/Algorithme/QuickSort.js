'use strict';

function Pivot(arr, start = 0, end = arr.length) {
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]];
    }
  }
  [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
  console.log(arr);
  return swapIdx;
}

function QuickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIdx = Pivot(arr, left, right);
    // left
    QuickSort(arr, left, pivotIdx - 1);
    //right
    QuickSort(arr, pivotIdx + 1, right);
  }
  return arr;
}

// console.log(QuickSort([5, 4, 6, 3, 1, 2]));
console.log(QuickSort([4, 6, 9, 1, 2, 5]));
