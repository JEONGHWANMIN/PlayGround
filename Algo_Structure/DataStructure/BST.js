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
}

let t = new BinarySearchTree();

t.insert(10);
t.insert(2);
t.insert(3);
t.find(2);
console.log(t.contain(14));
