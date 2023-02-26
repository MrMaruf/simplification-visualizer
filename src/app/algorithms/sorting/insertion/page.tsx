"use client";

import List from "@/components/List";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";

type Props = {};

const items = Array.from(new Array(10), (x, i) => i+1);
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const sortArray = (toSort: number[]) => {
  const length = toSort.length;
  for (let index = 1; index < length; index++) {
    let index2 = index;
    do {
      let elementLeft = toSort[index2 - 1];
      let elementRight = toSort[index2];
      if (elementLeft < elementRight) break;
      toSort[index2] = elementLeft;
      toSort[index2 - 1] = elementRight;
      index2--;
    } while (index2 > 0);
  }
  return toSort;
};
//TODO: Look into animation on end stagger
//TODO: Look into step by step sorting and shuffling.
//TODO: Look into not only animating sorting process but only every step that goes before and after sorting.
const InsertionSortingAlgorithm = (props: Props) => {
  const [shuffledItems, setShuffledItems] = useState<number[]>([]);
  const [sortedItems, setSortedArray] = useState<number[]>([]);

  const onReset = () => {
    setShuffledItems([]);
    setSortedArray([]);
  };
  const onShuffle = () => {
    const newShuffle = shuffleArray([...items]);
    setShuffledItems(newShuffle);
  };
  const onSort = () => {
    setSortedArray([...shuffledItems]);
    // const toSort = [...shuffledItems];
    // const length = toSort.length;
    // let index = 1,
    //   index2: number;
    // let interval = setInterval(() => {
    //   console.log("In interval")
    //   if (index == length) clearInterval(interval);
    //   if (index2 <= 0) index++;
    //   index2 = index;
    //   const elementLeft = toSort[index2 - 1];
    //   const elementRight = toSort[index2];
    //   if (elementLeft < elementRight) {
    //     index2 = 0;
    //     return;
    //   }
    //   toSort[index2] = elementLeft;
    //   toSort[index2 - 1] = elementRight;
    //   setSortedArray([...toSort]);
    //   index2--;
    // }, 3000);
    // for (let index = 1; index < length; index++) {
    //   let index2 = index;
    //   do {
    //     let elementLeft = toSort[index2 - 1];
    //     let elementRight = toSort[index2];
    //     if (elementLeft < elementRight) break;
    //     toSort[index2] = elementLeft;
    //     toSort[index2 - 1] = elementRight;
    //     index2--;
    //   } while (index2 > 0);
    // }
    setTimeout(() => {
      const toSort = [...shuffledItems];
      const sorted = sortArray(toSort);
      setSortedArray(sorted);
    }, 500);
  };
  return (
    <Box margin="15px 10px">
      <h1>Insertion Algorithm</h1>
      <Grid container spacing={2} marginTop="15px" className={styles.stack}>
        <Grid container xs={7}>
          <Grid xs={4}>
            <Button variant="contained" color="info" onClick={onShuffle}>
              Shuffle Array
            </Button>
          </Grid>
          <Grid xs={4}>
            <Button variant="contained" color="primary" onClick={onSort}>
              Sort Array
            </Button>
          </Grid>
          <Grid xs={4}>
            <Button variant="contained" color="warning" onClick={onReset}>
              Reset Array
            </Button>
          </Grid>
        </Grid>
        <Grid container xs={8}>
          <Grid display="flex" xs={4}>
            <h2>Original Array</h2>
          </Grid>
          <Grid xs={8}>
            <List className={styles.list} items={items} />
          </Grid>
        </Grid>
        {shuffledItems.length > 0 && (
          <Grid container xs={8}>
            <Grid display="flex" xs={4}>
              <h2>Shuffled Array</h2>
            </Grid>
            <Grid xs={8}>
              <List className={styles.list} items={shuffledItems} />
            </Grid>
          </Grid>
        )}
        {sortedItems.length > 0 && (
          <Grid container xs={8}>
            <Grid display="flex" xs={4}>
              <h2>Sorted Array</h2>
            </Grid>
            <Grid xs={8}>
              <List className={styles.list} items={sortedItems} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default InsertionSortingAlgorithm;
