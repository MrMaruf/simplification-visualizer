import React from "react";

import Grid from "@mui/material/Unstable_Grid2";

import List from "@/components/List";
import { Items } from "@/types/store/SortingTypes";

import styles from "./index.module.css";

type Props = {
  array: Items;
  name: string;
};

const ItemsArrayContainer = (props: Props) => {
  const { array, name } = props;
  return (
    <Grid container xs={8}>
      <Grid display="flex" alignItems="center" xs={4}>
        <h2>{name}</h2>
      </Grid>
      <Grid xs={8}>
        <List className={styles.list} items={array} />
      </Grid>
    </Grid>
  );
};

export default ItemsArrayContainer;
