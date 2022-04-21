class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let node = new Node(val);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      let lastNode = this.tail;
      lastNode.next = node;
      node.prev = lastNode;
      this.tail = node;
    }
    this.length++;
    return node;
  }
  pop() {
    if (!this.head) return null;
    let poped;
    if (this.length === 1) {
      poped = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return poped;
    } else {
      let lastNode = this.tail;
      poped = lastNode;
      lastNode.prev.next = null;
      this.tail = lastNode.prev;
      lastNode.prev = null;
    }
    this.length--;
    return poped;
  }
  shift() {
    if (!this.head) return null;
    let headNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let nextNode = headNode.next;
      nextNode.prev = null;
      this.head = nextNode;
      headNode.next = null;
    }
    this.length--;
    return headNode;
  }
  unshift(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
    return this;
  }
  get(idx) {
    if (idx >= this.length || idx < 0) return undefined;
    if (idx === 0) return this.head;
    let middle = Math.floor(this.length / 2);
    let find;
    if (idx < middle) {
      find = this.head;
      for (let i = 0; i < idx; i++) {
        find = find.next;
      }
    } else {
      find = this.tail;
      for (let i = 1; i < this.length - idx; i++) {
        find = find.prev;
      }
    }
    return find;
  }
  set(idx, val) {
    let foundNode = this.get(idx);
    if (foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }
  insert(idx, val) {
    if (idx > this.length || idx < 0) return false;
    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);
    let foundNode = this.get(idx - 1);
    let newNode = new Node(val);
    if (foundNode) {
      let next = foundNode.next;
      foundNode.next = newNode;
      newNode.next = next;
      next.prev = newNode;
    }
    this.length++;
    return newNode;
  }
  remove(idx) {
    if (idx > this.length || idx < 0) return false;
    if (idx === this.length - 1) return this.pop();
    if (idx === 0) return this.shift();
    let foundNode = this.get(idx);
    if (foundNode) {
      let PreNode = foundNode.prev;
      let NextNode = foundNode.next;
      PreNode.next = NextNode;
      NextNode.prev = PreNode;
      foundNode.next = null;
      foundNode.prev = null;
    }
    this.length--;
    return foundNode;
  }
}

let first = new DoubleLinkedList();

first.push(1);
first.push(2);
first.push(3);
first.push(4); // middle 3
first.push(5);
first.push(6);
console.log(first.remove(5));
console.log(first);
// console.log(first.get(6));
// first.push(2);
// first.push(3);
// first.push(4);
// console.log(first.shift());
// console.log(first);
