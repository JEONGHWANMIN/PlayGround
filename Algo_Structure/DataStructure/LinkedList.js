class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let pre = current;
    while (current.next) {
      pre = current;
      current = current.next;
    }
    this.tail = pre;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }
  shift() {
    if (!this.head) return undefined;
    let current = this.head;
    let nextNode = current.next;
    current.next = null;
    this.head = nextNode;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current.val;
  }
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return newNode;
  }
  get(num) {
    if (num === 0) return this.head;
    if (num >= this.length || num < 0) return null;
    let current = this.head;
    let find;
    for (let i = 0; i < num; i++) {
      current = current.next;
    }
    // console.log(current);
    return current;
  }
  set(idx, val) {
    let foundNode = this.get(idx);
    if (foundNode) {
      foundNode.val = val;
      return true;
    } else {
      return false;
    }
  }
  insert(idx, val) {
    if (idx < 0 || idx > this.length) return false;
    if (idx === this.length) return this.push(val);
    if (idx === 0) return this.unshift(val);
    let PreNode = this.get(idx - 1);
    let newNode = new Node(val);
    let NextNode = PreNode.next;
    PreNode.next = newNode;
    newNode.next = NextNode;
    this.length++;
    return true;
  }
  remove(idx) {
    if (idx < 0 || idx > this.length) return undefined;
    if (idx === 0) this.shift();
    if (idx === this.length - 1) this.pop();
    let PreNode = this.get(idx - 1);
    let DeleteNode = PreNode.next;
    PreNode.next = DeleteNode.next;
    this.length--;
    return true;
  }
  reverse() {
    // head 와 tail 부분을 교체
    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    // 각 노드들의 구조를 추적하고 교체하기 위한 변수
    let pre = null;
    let next;

    // 노드 갯수만큼 반복문을 돌면서 다음노드를 가르키면서 그 노드의 next값으로 pre값을 가르키게 바꾼다.
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = pre;
      pre = node;
      node = next;
    }

    return this;
  }
}

const l_lisst = new SinglyLinkedList();

l_lisst.push(23);
l_lisst.push(30);
l_lisst.push(45);
l_lisst.push(50);

// l_lisst.pop();
// l_lisst.pop();
// l_lisst.pop();
// l_lisst.pop();

// console.log(l_lisst.get(2));
// console.log(l_lisst.insert(2, 'Hi 20'));
// console.log(l_lisst.get(2));

l_lisst.reverse();

console.log(l_lisst);
