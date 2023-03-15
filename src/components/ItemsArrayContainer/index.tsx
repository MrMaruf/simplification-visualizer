import React from "react";

import Grid from "@mui/material/Unstable_Grid2";

import List from "@/components/List";
import MaterialList from "@mui/material/List"

import styles from "./index.module.css";
import { Item } from "@/types/store/SortingTypes";
import Stack from "@mui/material/Stack";
import { Flipped, Flipper } from "react-flip-toolkit";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ListItem from "@mui/material/ListItem";

type Props = {
  array: Item[];
  name: string;
};
// TODO: Create an indicator under list
const ItemsArrayContainer = (props: Props) => {
  const { array, name } = props;
  const arrowArray = array.map((item) => {
    const { className } = item;
    if (className) {
      if (className.includes("comparing")) return "comparing";
      // if (className.includes("comparable")) return "comparable";
    }
    return item.name;
  });
  return (
    <Grid container xs={8}>
      <Grid display="flex" alignItems="center" xs={4}>
        <h2>{name}</h2>
      </Grid>
      <Grid xs={8}>
        <Stack>
          <List className={styles.list} items={array} />

          <Flipper flipKey={arrowArray.join("")} element={undefined}>
            <MaterialList className={styles.arrowList}>
              {arrowArray.map((item) => {
                return (
                  <Flipped key={item} flipId={item}>
                    <ListItem>
                      {item === "comparing" && (
                        <ArrowDropUpIcon color="primary" />
                      )}
                      {item === "comparable" && (
                        <ArrowDropUpIcon color="secondary" />
                      )}
                    </ListItem>
                  </Flipped>
                );
              })}
            </MaterialList>
          </Flipper>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ItemsArrayContainer;
