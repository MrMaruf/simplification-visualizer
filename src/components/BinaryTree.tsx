import BinaryTree from "@/models/BinaryTree";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import TreeNodeComponent from "./TreeNode";

type Props = {
  tree: BinaryTree;
};

const BinaryTreeComponent = (props: Props) => {
  const { tree } = props;
  return (
    <Grid container xs={12}>
      {tree.root ? (
        <TreeNodeComponent treeNode={tree.root} />
      ) : (
        "No root present in the tree"
      )}
    </Grid>
  );
};

export default BinaryTreeComponent;
