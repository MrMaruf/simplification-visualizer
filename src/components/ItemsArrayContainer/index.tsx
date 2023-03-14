import React from "react";

import Grid from "@mui/material/Unstable_Grid2";

import List from "@/components/List";

import styles from "./index.module.css";
import { Item } from "@/types/store/SortingTypes";
import Stack from "@mui/material/Stack";

type Props = {
  array: Item[];
  name: string;
};
// TODO: Create an indicator under list
const ItemsArrayContainer = (props: Props) => {
  const { array, name } = props;
  return (
    <Grid container xs={8}>
      <Grid display="flex" alignItems="center" xs={4}>
        <h2>{name}</h2>
      </Grid>
      <Grid xs={8}>
        <Stack>
          <List className={styles.list} items={array} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ItemsArrayContainer;
