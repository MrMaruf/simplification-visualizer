import React, { useEffect, useMemo, useRef, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import SortTypeSelector from "@/components/SortTypeSelector";
import Button from "@mui/material/Button";
import styles from "./index.module.css";
import { useSortingState } from "@/store/SortingContext";
import { Item, Stage } from "@/types/store/SortingTypes";
import SortingType from "@/types/SortType";
import List from "../List";
import StagedControls from "./StagedControls";

type Props = {
  stagedSortArray: (items: Item[]) => Stage[];
  sortArray: (items: Item[]) => Item[];
};

const SortingControls = (props: Props) => {
  const sortingCtx = useSortingState();
  const { sortingType, items, stagingSpeed } = sortingCtx.state;
  const { stagedSortArray, sortArray } = props;
  const [isSorting, setIsSorting] = useState(false);
  const sortingIntervalRef = useRef<NodeJS.Timer | undefined>(undefined);
  const originalItems: Item[] = useMemo(() => sortArray(items), [items.length]);
  const onReset = () => {
    sortingCtx.dispatch({ type: "set stages", stages: [] });
    sortingCtx.dispatch({ type: "generate array", length: 10 });
  };
  const clearSortingInterval = () => {
    if (!sortingIntervalRef.current) return;
    clearInterval(sortingIntervalRef.current);
    setIsSorting(false);
  };
  const onShuffle = () => {
    clearSortingInterval();
    sortingCtx.dispatch({ type: "shuffle array" });
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

  const onSortingTypeChange = (value: SortingType) => {
    clearSortingInterval();
    sortingCtx.dispatch({
      type: "change sorting type",
      newType: value,
    });
  };
  const isSorted = items.every(
    (value, index) => originalItems[index].name === value.name
  );
  return (
    <Grid container xs={11} className={styles.controllers}>
      <Grid xs={3}>
        <SortTypeSelector value={sortingType} onChange={onSortingTypeChange} />
      </Grid>
      <Grid xs={3}>
        <Button
          disabled={isSorting}
          variant="contained"
          color="info"
          onClick={onShuffle}
        >
          Shuffle Array
        </Button>
      </Grid>
      <Grid xs={3}>
        <Button
          disabled={isSorted}
          variant="contained"
          color={isSorting ? "error" : "primary"}
          onClick={onSort}
        >
          {isSorting ? "Stop sorting" : "Sort Array"}
        </Button>
      </Grid>
      <Grid xs={3}>
        <Button
          disabled={isSorted || isSorting}
          variant="contained"
          color="warning"
          onClick={onReset}
        >
          Reset Array
        </Button>
      </Grid>
      {sortingType !== "realtime" && <StagedControls isSorting={isSorting} />}
    </Grid>
  );
};

export default SortingControls;
