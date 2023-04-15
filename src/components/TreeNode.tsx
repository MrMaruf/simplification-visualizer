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
        <React.Fragment>
          <Grid container xs={6}>
            <svg
              id={treeNode.val + ""}
              width="50"
              height="50"
              style={{ position: "absolute" }}
            >
              <line x1="50" y1="0" x2="0" y2="50" stroke="white" />
            </svg>
            <TreeNodeComponent treeNode={treeNode.left} />
          </Grid>
        </React.Fragment>
      )}
      {treeNode.right && (
        <React.Fragment>
          <Grid container xs={6}>
            <svg
              id={treeNode.val + ""}
              width="50"
              height="50"
              style={{ position: "absolute" }}
            >
              <line x1="0" y1="0" x2="50" y2="50" stroke="white" />
            </svg>
            <TreeNodeComponent treeNode={treeNode.right} />
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TreeNodeComponent;
