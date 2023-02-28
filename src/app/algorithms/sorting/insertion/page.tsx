"use client";

import List from "@/components/List";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";

type Props = {};
type SortingSpeed = "realtime" | "stages";
const originalItems = Array.from(new Array(10), (x, i) => i + 1);
const generateArray = (length: number) =>
  Array.from(new Array(length), (x, i) => i + 1);
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
const stagedSortArray = (toSort: number[]) => {
  const stages: number[][] = [];
  const length = toSort.length;
  for (let index = 1; index < length; index++) {
    let index2 = index;
    do {
      let elementLeft = toSort[index2 - 1];
      let elementRight = toSort[index2];
      if (elementLeft < elementRight) break;
      stages.push([...toSort]);
      toSort[index2] = elementLeft;
      toSort[index2 - 1] = elementRight;
      index2--;
    } while (index2 > 0);
  }
  stages.push([...toSort]); // add last stage
  return stages;
};
const timeout = async (timeMs: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("finished");
    }, timeMs);
  });
};
//TODO: Look into animation on end stagger
//TODO: Look into step by step sorting and shuffling.
//TODO: Look into not only animating sorting process but only every step that goes before and after sorting.
const InsertionSortingAlgorithm = (props: Props) => {
  const [sortingSpeed, setSortingSpeed] = useState<SortingSpeed>("realtime");
  const [items, setItems] = useState<number[]>(generateArray(10));
  const [sortingStages, setSortingStages] = useState<number[][]>([]);
  const onSortingSpeedChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSortingSpeed(event.target.checked ? "realtime" : "stages");
  };
  const onReset = () => {
    setItems([]);
  };
  const onShuffle = () => {
    setSortingStages([]);
    const newShuffle = shuffleArray([...originalItems]);
    setItems(newShuffle);
  };
  const onSort = () => {
    const toSort = [...items];
    if (sortingSpeed === "realtime") return setItems(sortArray(toSort));

    const stages = stagedSortArray(toSort);
    setSortingStages(stages);
  };
  const onStageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value)
    const selectedStage = sortingStages[value - 1];
    setItems(selectedStage);
  };
  return (
    <Box margin="15px 10px">
      <h1>Insertion Algorithm</h1>
      <Grid container spacing={2} marginTop="15px" className={styles.stack}>
        <Grid container xs={8}>
          <Grid display="flex" xs={4}>
            <h2>Original Array</h2>
          </Grid>
          <Grid xs={8}>
            <List className={styles.list} items={originalItems} />
          </Grid>
        </Grid>
        <Grid container xs={10} className={styles.controllers}>
          <Grid xs={3}>
            <Button variant="contained" color="info" onClick={onShuffle}>
              Shuffle Array
            </Button>
          </Grid>
          <Grid xs={3}>
            <Button variant="contained" color="primary" onClick={onSort}>
              Sort Array
            </Button>
          </Grid>
          <Grid xs={3}>
            <Button variant="contained" color="warning" onClick={onReset}>
              Reset Array
            </Button>
          </Grid>

          <Grid xs={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Staged</Typography>
              <Switch
                checked={sortingSpeed === "realtime"}
                onChange={onSortingSpeedChanged}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography>Realtime</Typography>
            </Stack>
          </Grid>
          {sortingStages.length > 0 && sortingSpeed === "stages" && (
            <Grid container xs={8} className={styles.stages}>
              <Grid
                xs={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography>Stages</Typography>
              </Grid>
              <Grid xs={10}>
                <Pagination
                  color="primary"
                  boundaryCount={2}
                  count={sortingStages.length}
                  onChange={onStageChange}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid container xs={8}>
          <Grid display="flex" xs={4}>
            <h2>Numbers Array</h2>
          </Grid>
          <Grid xs={8}>
            <List className={styles.list} items={items} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsertionSortingAlgorithm;
