/* 
최대 이진 힙 : Tree랑 비슷하지만 루트노드에 제일 큰 값이 오며 그 아래 값은 무조건 작기만 하면 된다.
즉 자식간의 크기는 일정하지 않을 수 있음
자식노드에서 부모노드 찿는법 : (n - 1) / 2
부모노드에서 자식노드 찿는법 : left : 2n-1 , right 2n-2
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
}

let heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);

console.log(heap);
