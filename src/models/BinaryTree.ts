import TreeNode from "./TreeNode";

class BinaryTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  insert(val: number) {
    const newNode = new TreeNode(val);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currNode = this.root;
    while (true) {
      if (val < currNode.val) {
        if (currNode.left === null) {
          currNode.left = newNode;
          return;
        }
        currNode = currNode.left;
      } else {
        if (currNode.right === null) {
          currNode.right = newNode;
          return;
        }
        currNode = currNode.right;
      }
    }
  }

  traverseInOrder(node: TreeNode | null, arr: number[] = []) {
    if (node === null) {
      return arr;
    }
    this.traverseInOrder(node.left, arr);
    arr.push(node.val);
    this.traverseInOrder(node.right, arr);
    return arr;
  }

  findNode(val: number, node: TreeNode | null = this.root): TreeNode | null {
    if (node === null || node.val === val) {
      return node;
    }
    if (val < node.val) {
      return this.findNode(val, node.left);
    } else {
      return this.findNode(val, node.right);
    }
  }
  swapNodes(val1: number, val2: number) {
    const node1 = this.findNode(val1);
    const node2 = this.findNode(val2);
    if (!node1 || !node2) {
      return;
    }
    const temp = node1.val;
    node1.val = node2.val;
    node2.val = temp;
  }

  toString() {
    let str = "";
    if (this.root === null) {
      return str;
    }

    const stack: (TreeNode | undefined | null)[] = [this.root];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node === null) {
        str += "#,";
      } else {
        str += node?.val + ",";
        stack.push(node?.right);
        stack.push(node?.left);
      }
    }
    // Remove trailing comma
    str = str.slice(0, -1);
    return str;
  }
}
export default BinaryTree;
