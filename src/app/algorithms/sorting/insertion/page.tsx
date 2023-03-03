"use client";

import List from "@/components/List";
import SortTypeSelector from "@/components/SortTypeSelector";
import TimeSlider from "@/components/TimeSlider";
import SortingType from "@/types/SortType";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

type Props = {};
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

//TODO: Extract functionality to components for reuse
//TODO: Look into not only animating sorting process but only every step that goes before and after sorting.
const InsertionSortingAlgorithm = (props: Props) => {
  const [sortingType, setSortingType] = useState<SortingType>("realtime");
  const [items, setItems] = useState<number[]>(generateArray(10));
  const [sortingStages, setSortingStages] = useState<number[][]>([]);
  const [stagingSpeed, setStagingSpeed] = useState(300);
  const [currentStage, setCurrentStage] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const sortingIntervalRef = useRef<NodeJS.Timer | undefined>(undefined);
  const onReset = () => {
    setItems(generateArray(10));
  };
  const onShuffle = () => {
    clearSortingInterval();
    setCurrentStage(0);
    setSortingStages([]);
    const newShuffle = shuffleArray([...originalItems]);
    setItems(newShuffle);
  };
  const clearSortingInterval = () => {
    if (!sortingIntervalRef.current) return;
    clearInterval(sortingIntervalRef.current);
    setIsSorting(false);
  };
  const onSort = () => {
    if (isSorting) return clearSortingInterval();
    setCurrentStage(0);
    const toSort = [...items];
    if (sortingType === "realtime") return setItems(sortArray(toSort));

    const stages = stagedSortArray(toSort);
    setSortingStages(stages);
    if (sortingType === "staged automatic")
      startSortingInterval(stages, stagingSpeed);
  };
  const startSortingInterval = (stages: number[][], stagingSpeed: number) => {
    setIsSorting(true);
    sortingIntervalRef.current = setInterval(() => {
      setCurrentStage((value) => {
        if (value === stages.length) {
          clearSortingInterval();
          return value;
        }
        const selectedStage = stages[value];
        setItems(selectedStage);
        return value + 1;
      });
    }, stagingSpeed);
  };
  useEffect(() => {
    return () => {
      if (sortingIntervalRef.current) clearInterval(sortingIntervalRef.current);
    };
  }, []);

  const onStageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentStage(value);
    const selectedStage = sortingStages[value - 1];
    setItems(selectedStage);
  };
  return (
    <Box>
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
        <Grid container xs={11} className={styles.controllers}>
          <Grid xs={3}>
            <SortTypeSelector
              value={sortingType}
              onChange={(value) => setSortingType(value)}
            />
          </Grid>
          <Grid xs={3}>
            <Button variant="contained" color="info" onClick={onShuffle}>
              Shuffle Array
            </Button>
          </Grid>
          <Grid xs={3}>
            <Button
              disabled={items.every(
                (value, index) => originalItems[index] === value
              )}
              variant="contained"
              color={isSorting ? "error" : "primary"}
              onClick={onSort}
            >
              {isSorting ? "Stop sorting" : "Sort Array"}
            </Button>
          </Grid>
          <Grid xs={3}>
            <Button variant="contained" color="warning" onClick={onReset}>
              Reset Array
            </Button>
          </Grid>
          {sortingType === "staged automatic" && (
            <Grid container xs={8} padding="3rem">
              <TimeSlider
                value={stagingSpeed}
                onChange={(event, value) => {
                  if (typeof value === "number") setStagingSpeed(value);
                }}
                disabled={isSorting}
              />
            </Grid>
          )}
          {sortingStages.length > 1 && (
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
                  disabled={sortingType !== "staged manual"}
                  hideNextButton={sortingType !== "staged manual"}
                  hidePrevButton={sortingType !== "staged manual"}
                  color="primary"
                  boundaryCount={2}
                  count={sortingStages.length}
                  page={currentStage}
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
