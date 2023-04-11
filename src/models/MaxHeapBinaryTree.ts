import BinaryTree from "./BinaryTree";
import TreeNode from "./TreeNode";

class MaxHeapBinaryTree extends BinaryTree {
  arrayToTree(array: number[], currentIndex = 0): TreeNode | null {
    if (currentIndex >= array.length) {
      return null;
    }
    const root = new TreeNode(array[currentIndex]);
    if (currentIndex === 0) this.root = root;
    root.left = this.arrayToTree(array, 2 * currentIndex + 1);
    root.right = this.arrayToTree(array, 2 * currentIndex + 2);

    return root;
  }
  treeToArray(): number[] {
    const array: number[] = [];
    if (!this.root) {
      return array;
    }

    const stack: TreeNode[] = [this.root];
    while (stack.length) {
      const node = stack.pop()!;
      array.push(node.val);
      if (node.right) {
        stack.push(node.right);
      }
      if (node.left) {
        stack.push(node.left);
      }
    }

    return array;
  }
}
export default MaxHeapBinaryTree
