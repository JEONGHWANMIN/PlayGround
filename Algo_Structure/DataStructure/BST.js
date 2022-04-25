class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(val) {
    let node = new Node(val);
    if (!this.root) {
      this.root = node;
    } else {
      let current = this.root;
      while (true) {
        // left
        if (val === current.val) return undefined;
        if (val < current.val) {
          if (current.left === null) {
            current.left = node;
            return this;
          } else {
            current = current.left;
          }
        } else if (val > current.val) {
          if (current.right === null) {
            current.right = node;
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  }
  find(val) {
    if (!this.root) {
      return false;
    } else {
      let current = this.root;
      while (current) {
        if (current.val === val) {
          return current;
        } else if (val > current.val) {
          current = current.right;
        } else if (val < current.val) {
          current = current.left;
        }
      }
      return null;
    }
  }
  contain(val) {
    if (!this.root) {
      return false;
    } else {
      let current = this.root;
      while (current) {
        if (current.val === val) {
          return true;
        } else if (val > current.val) {
          current = current.right;
        } else if (val < current.val) {
          current = current.left;
        }
      }
      return false;
    }
  }
  // 넓이 우선 탐색
  BFS() {
    if (!this.root) return null;
    let queue = [];
    let visit = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      let node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      visit.push(node.val);
    }
    return visit;
  }
  // 깊이 우선 탐색 (전위순회) : 루트부터 왼쪽 아래로 탐색
  DFSPreOrder() {
    if (!this.root) return null;
    let visit = [];
    function traversion(node) {
      // left traversion
      visit.push(node.val);
      if (node.left) traversion(node.left);
      if (node.right) traversion(node.right);
    }
    traversion(this.root);
    // [ 10, 6, 3, 8, 15, 20 ]
    return visit;
  }
  // (후위순회) : 왼쪽 아래 리프노드 부터 위로 올라오면서 탐색 루트가 마지막
  DFSPostOrder() {
    if (!this.root) return null;
    let visit = [];
    function traversion(node) {
      if (node.left) traversion(node.left);
      if (node.right) traversion(node.right);
      visit.push(node.val);
    }
    traversion(this.root);
    // [ 3, 8, 6, 20, 15, 10 ]
    return visit;
  }
  // (중위순회) : 루트가 처음이나 마지막이 아니다. 왼쪽 리프 노드부터 차례대로 탐색
  DFSInOrder() {
    if (!this.root) return null;
    let visit = [];
    function traversion(node) {
      if (node.left) traversion(node.left);
      visit.push(node.val);
      if (node.right) traversion(node.right);
    }
    traversion(this.root);
    // [3,6,8,10,15,20]
    return visit;
  }
}

let t = new BinarySearchTree();

t.insert(10);
t.insert(6);
t.insert(15);
t.insert(3);
t.insert(8);
t.insert(20);

console.log(t.DFSInOrder());
