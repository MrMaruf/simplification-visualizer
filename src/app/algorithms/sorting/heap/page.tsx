"use client";

import BinaryTreeComponent from "@/components/BinaryTree";
import ItemsArrayContainer from "@/components/ItemsArrayContainer";
import SortingControls from "@/components/SortingControls";
import { sortArray, stagedSortArray } from "@/controllers/sorting/heap";
import { useSortingState } from "@/store/SortingContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

import styles from "./index.module.css";

type Props = {};

//TODO: Find a way to create binary tree
//TODO: Find a way to get stages to handle more than items for case like heap tree
//TODO: Split into 2 stages? One for max heap tree & two for sorting

const HeapSortingAlgorithm = (props: Props) => {
  const sortingCtx = useSortingState();
  const { items, currentStage, sortingStages } = sortingCtx.state;
  const { binaryTree } = sortingStages[currentStage - 1] ?? {};
  console.log(sortingStages, currentStage);
  return (
    <Box>
      <h1>Heap Sort Algorithm</h1>
      <Grid container spacing={2} marginTop="15px">
        <SortingControls
          sortArray={sortArray}
          stagedSortArray={stagedSortArray.bind(
            null,
            styles.parent,
            styles.right,
            styles.left
          )}
        />
        <ItemsArrayContainer
          // secondaryArrowClass={[styles.currentMinimumIndex, styles.comparingItem]}
          primaryArrowClass={[styles.parent]}
          name="Numbers Array"
          array={items}
        />
        {binaryTree && <BinaryTreeComponent tree={binaryTree} />}
      </Grid>
    </Box>
  );
};

export default HeapSortingAlgorithm;
