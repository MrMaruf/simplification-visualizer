import React, { useEffect, useRef, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import SortTypeSelector from "@/components/SortTypeSelector";
import TimeSlider from "@/components/TimeSlider";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import styles from "./index.module.css";
import { useSortingState } from "@/store/SortingContext";
import { Items } from "@/types/store/SortingTypes";

type Props = {
  originalItems: Items;
  stagedSortArray: (items: Items) => Items[];
  sortArray: (items: Items) => Items;
};

const SortingControls = (props: Props) => {
  const sortingCtx = useSortingState();
  const { sortingType, items, stagingSpeed, sortingStages, currentStage } =
    sortingCtx.state;
  const { stagedSortArray, sortArray } = props;
  const [isSorting, setIsSorting] = useState(false);
  const sortingIntervalRef = useRef<NodeJS.Timer | undefined>(undefined);
  const onReset = () => {
    sortingCtx.dispatch({ type: "generate array", length: 10 });
  };
  const onShuffle = () => {
    clearSortingInterval();
    sortingCtx.dispatch({ type: "shuffle array" });
  };
  const clearSortingInterval = () => {
    if (!sortingIntervalRef.current) return;
    clearInterval(sortingIntervalRef.current);
    setIsSorting(false);
  };
  const onSort = () => {
    if (isSorting) return clearSortingInterval();
    const toSort = [...items];
    if (sortingType === "realtime")
      return sortingCtx.dispatch({
        type: "set items",
        items: sortArray(toSort),
      });

    const stages = stagedSortArray(toSort);
    sortingCtx.dispatch({ type: "set stages", stages });
    if (sortingType === "staged automatic") startSortingInterval(stagingSpeed);
  };
  const startSortingInterval = (stagingSpeed: number) => {
    setIsSorting(true);
    sortingIntervalRef.current = setInterval(() => {
      sortingCtx.dispatch({ type: "move stage", onEnd: clearSortingInterval });
    }, stagingSpeed);
  };
  useEffect(() => {
    return () => {
      if (sortingIntervalRef.current) clearInterval(sortingIntervalRef.current);
    };
  }, []);

  const onStageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    sortingCtx.dispatch({ type: "move stage", newStage: value });
  };
  return (
    <Grid container xs={11} className={styles.controllers}>
      <Grid xs={3}>
        <SortTypeSelector
          value={sortingType}
          onChange={(value) =>
            sortingCtx.dispatch({
              type: "change sorting type",
              newType: value,
            })
          }
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
            (value, index) => props.originalItems[index] === value
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
              if (typeof value === "number")
                sortingCtx.dispatch({
                  type: "change sorting speed",
                  newSpeed: value,
                });
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
  );
};

export default SortingControls;
