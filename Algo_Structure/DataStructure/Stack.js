class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }
  /*
  push 1 2 3 
  3 -> 2 -> 1 
  */
  push(val) {
    let node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      let temp = this.first;
      this.first = node;
      this.first.next = temp;
    }
    this.length++;
    return node;
  }
  pop() {
    if (!this.first) return null;
    let temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.length--;
    return temp;
  }
}

let stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();
stack.pop();
stack.pop();

stack.push(4);
stack.push(5);

console.log(stack);
