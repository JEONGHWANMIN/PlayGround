/* 
최대 이진 힙 : Tree랑 비슷하지만 루트노드에 제일 큰 값이 오며 그 아래 값은 무조건 작기만 하면 된다.
즉 자식간의 크기는 일정하지 않을 수 있음
자식노드에서 부모노드 찿는법 : (n - 1) / 2
부모노드에서 자식노드 찿는법 : left : 2n+1 , right 2n+2
insert() : 값을 배열에 넣고 버블업을 해줘야한다.
 */
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(ele) {
    this.values.push(ele);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (parent >= element) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  exTractMax() {
    let max = this.values[0];
    let end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
  }
  sinkDown() {
    let idx = 0;
    let element = this.values[0];
    while (true) {
      let leftIdx = 2 * idx + 1;
      let rightIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftIdx < this.length) {
        leftChild = this.values[leftIdx];
        if (leftChild > element) {
          swap = leftIdx;
        }
      }
      if (rightIdx < this.length) {
        rightChild = this.values[rightIdx];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightIdx;
        }
      }

      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
    }
  }
}

let heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);

console.log(heap.exTractMax());
console.log(heap.exTractMax());
console.log(heap.exTractMax());
console.log(heap.exTractMax());
console.log(heap.exTractMax());
console.log(heap.exTractMax());
console.log(heap.exTractMax());

console.log(heap);
