"use client";

import List from "@/components/List";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useMemo, useState } from "react";
import styles from "./index.module.css";

type Props = {};

const items = Array.from(new Array(10), (x, i) => i + 1);
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const InsertionSortingAlgorithm = (props: Props) => {
  const [shuffledItems, setShuffledItems] = useState([...items]);
  const [sortedItems, setSortedArray] = useState([...items]);

  const onShuffle = () => {
    setShuffledItems((value) => {
      const newShuffle = shuffleArray([...value])
      setSortedArray([...newShuffle])
      return newShuffle
    });
    
  };
  const onSort = () => {
    const toSort = [...shuffledItems];
    const length = shuffledItems.length;
    for (let index = 1; index < length - 1; index++) {
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
    setSortedArray(toSort);
  };
  return (
    <Box margin="15px 10px">
      <h1>Insertion Algorithm</h1>
      <Grid container spacing={2} marginTop="15px" className={styles.stack}>
        <Grid container xs={5}>
          <Grid xs={5}>
            <Button variant="contained" onClick={onShuffle}>
              Shuffle Array
            </Button>
          </Grid>
          <Grid xs={5}>
            <Button variant="contained" onClick={onSort}>
              Sort Array
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
        <Grid container xs={8}>
          <Grid display="flex" xs={4}>
            <h2>Shuffled Array</h2>
          </Grid>
          <Grid xs={8}>
            <List className={styles.list} items={shuffledItems} />
          </Grid>
        </Grid>
        <Grid container xs={8}>
          <Grid display="flex" xs={4}>
            <h2>Sorted Array</h2>
          </Grid>
          <Grid xs={8}>
            <List className={styles.list} items={sortedItems} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsertionSortingAlgorithm;
