function SelectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    console.log(`${i + 1}PASS >> `, arr);
  }
  return arr;
}

console.log(SelectionSort([6, 3, 1, 2, 5]));
// [1,4,3,5,2]
// [1,2,3,5,4]
// [1,2,3,5,4]
// [1,2,3,4,5]
