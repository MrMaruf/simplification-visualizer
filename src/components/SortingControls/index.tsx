import React from "react";

import Grid from "@mui/material/Unstable_Grid2";
import SortTypeSelector from "@/components/SortTypeSelector";
import TimeSlider from "@/components/TimeSlider";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import styles from "./index.module.css";

type Props = {};

const SortingControls = (props: Props) => {
  return (
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
  );
};

export default SortingControls;
