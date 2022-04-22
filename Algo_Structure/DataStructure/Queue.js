class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  enqueue(val) {
    let node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    this.size++;
    return this;
  }
  dequeue() {
    if (!this.first) return null;
    if (this.size === 1) {
      let firstNode = this.first;
      this.first = null;
      this.last = null;
      this.size--;
      return firstNode;
    } else {
      let firstNext = this.first.next;
      let firstNode = this.first;
      firstNode.next = null;
      this.first = firstNext;
      this.size--;
      return firstNode;
    }
  }
}

let q = new Queue();

q.enqueue(2);
q.enqueue(3);
q.enqueue(4);

q.dequeue();
q.dequeue();

q.enqueue(5);

q;
