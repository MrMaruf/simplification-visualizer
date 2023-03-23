"use client";

import ItemsArrayContainer from "@/components/ItemsArrayContainer";
import SortingControls from "@/components/SortingControls";
import { sortArray, stagedSortArray } from "@/controllers/sorting/insertion";
import { useSortingState } from "@/store/SortingContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

import styles from "./index.module.css";

type Props = {};

const InsertionSortingAlgorithm = (props: Props) => {
  const sortingCtx = useSortingState();
  const { items } = sortingCtx.state;

  return (
    <Box>
      <h1>Insertion Algorithm</h1>
      <Grid container spacing={2} marginTop="15px">
        <SortingControls
          sortArray={sortArray}
          stagedSortArray={stagedSortArray.bind(
            null,
            styles.comparingItem,
            styles.comparableItem
          )}
        />
        <ItemsArrayContainer primaryArrowClass={[styles.comparingItem]} name="Numbers Array" array={items} />
      </Grid>
    </Box>
  );
};

export default InsertionSortingAlgorithm;
