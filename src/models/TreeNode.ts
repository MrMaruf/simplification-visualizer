class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    val: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  toString(indent: string = ""): string {
    let str = this.val + "\n";
    if (indent.length > 0) str = " " + str;
    if (this.left && this.right) str += indent + "├";
    else if (this.left || this.right) str += indent + "└";
    if (this.left !== null) {
      str += this.left.toString(indent + "│ ");
    }
    if (this.right !== null) {
      str += indent + "└" + this.right.toString(indent + "  ");
    }
    return str;
  }
}

export default TreeNode;
