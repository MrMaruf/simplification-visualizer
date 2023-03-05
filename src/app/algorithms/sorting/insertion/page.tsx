"use client";

import ItemsArrayContainer from "@/components/ItemsArrayContainer";
import SortingControls from "@/components/SortingControls";
import { sortArray, stagedSortArray } from "@/controllers/sorting/insertion";
import { useSortingState } from "@/store/SortingContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useMemo } from "react";

type Props = {};

//TODO: Look into not only animating sorting process but only every step that goes before and after sorting.
const InsertionSortingAlgorithm = (props: Props) => {
  const sortingCtx = useSortingState();
  const { items } = sortingCtx.state;

  const itemsLength = items.length;
  const originalItems = useMemo(() => [...items], [itemsLength]);

  return (
    <Box>
      <h1>Insertion Algorithm</h1>
      <Grid container spacing={2} marginTop="15px">
        <ItemsArrayContainer name="Original Array" array={originalItems} />
        <SortingControls
          sortArray={sortArray}
          stagedSortArray={stagedSortArray}
          originalItems={originalItems}
        />
        <ItemsArrayContainer name="Numbers Array" array={items} />
      </Grid>
    </Box>
  );
};

export default InsertionSortingAlgorithm;
