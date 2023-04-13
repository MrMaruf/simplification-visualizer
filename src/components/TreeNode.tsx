import TreeNode from "@/models/TreeNode";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

type Props = {
  treeNode: TreeNode;
};

const TreeNodeComponent = (props: Props) => {
  const { treeNode } = props;
  return (
    <React.Fragment>
      <Grid xs={12} textAlign="center">
        <Chip label={treeNode.val} variant="outlined" />
      </Grid>
      {treeNode.left && (
        <Grid container xs={6}>
          <TreeNodeComponent treeNode={treeNode.left} />
        </Grid>
      )}
      {treeNode.right && (
        <Grid container xs={6}>
          <TreeNodeComponent treeNode={treeNode.right} />
        </Grid>
      )}
    </React.Fragment>
  );
};

export default TreeNodeComponent;
