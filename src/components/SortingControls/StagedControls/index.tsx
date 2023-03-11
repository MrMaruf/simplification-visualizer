import React from "react";
import styles from "./index.module.css";

import Grid from "@mui/material/Unstable_Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import TimeSlider from "@/components/TimeSlider";

import { useSortingState } from "@/store/SortingContext";
import List from "@/components/List";

type Props = {
  isSorting: boolean;
};

const StagedControls = (props: Props) => {
  const sortingCtx = useSortingState();
  const { sortingType, stagingSpeed, sortingStages, currentStage } =
    sortingCtx.state;
  const { isSorting } = props;
  const onStageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    sortingCtx.dispatch({ type: "move stage", newStage: value });
  };
  return (
    <Grid container xs={12}>
      <Grid container xs={8}>
        {sortingType === "staged automatic" && (
          <Grid container xs={12} padding="3rem">
            <TimeSlider
              value={stagingSpeed}
              onValueChange={(value) => {
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
          <Grid
            container
            xs={12}
            className={styles.stages}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid xs={2}>
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
      <Grid container xs={4} padding="3rem">
        <List className={styles.stages} items={sortingStages} />
      </Grid>
    </Grid>
  );
};

export default StagedControls;
