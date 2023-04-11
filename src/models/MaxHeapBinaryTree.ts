import BinaryTree from "./BinaryTree";
import TreeNode from "./TreeNode";

class MaxHeapBinaryTree extends BinaryTree {
  traverse(
    node: TreeNode | null,
    array: Set<number>,
    allowedDepth: number,
    currentDepth: number = 0
  ): void {
    if (!node) {
      return;
    }

    array.add(node.val);
    if (node.left) array.add(node.left.val);
    if (node.right) array.add(node.right.val);
    if (allowedDepth <= currentDepth) return;
    this.traverse(node.left, array, allowedDepth, currentDepth + 1);
    this.traverse(node.right, array, allowedDepth, currentDepth + 1);
  }
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
  treeToArray(root: TreeNode | null = this.root): number[] {
    const numberSet: Set<number> = new Set();
    if (!root) {
      return [];
    }
    const treeArray = this.traverseInOrder(this.root);
    const maxDepth = (treeArray.length - 2) / 2 - 1;
    for (let currentDepth = 0; currentDepth < maxDepth; currentDepth++) {
      this.traverse(root, numberSet, currentDepth);
    }

    return Array.from(numberSet).flat();
  }
}
export default MaxHeapBinaryTree;
