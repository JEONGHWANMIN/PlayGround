/**
 * 이진트리
 * Full : 자식 레벨이 2 or 0
 * Perfect :  Full 트리에다가 leaf 노드 들이 같은 level일 경우
 * Complete : 왼쪽 부터 데이터가 순서대로 채워지는 트리
 * Degenerate : 모든 자식이 갯수가 1개인 트리
 * Balanced : 모든 노드가 diff (0,1) 왼쪽 자식과 오른쪽 자식의 깊이 차이를 기준으로 구한다.
 */

class Node {
  left = null;
  right = null;
  constructor(value) {
    this.value = value;
  }
}

class BinarySearchTree {
  root = null;

  #insert(node, value) {}
  insert(value) {
    if (!this.root) this.root = new Node(value);
    if (this.root.value > value) {
      this.#insert(this.root.left, value);
    }

    if (this.root.value <= value) {
      this.#insert(this.root.right, value);
    }
  }
  search() {}
  remove() {}
}

const bst = new BinarySearchTree();

bst.insert(8);
bst.insert(10);
bst.insert(3);
bst.insert(1);
bst.insert(14);
bst.insert(6);
bst.insert(7);
bst.insert(4);
bst.insert(13);
