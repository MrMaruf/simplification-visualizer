import React, { useMemo } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import List from "@/components/List";
import MaterialList from "@mui/material/List";

import styles from "./index.module.css";
import { Item } from "@/types/store/SortingTypes";
import Stack from "@mui/material/Stack";
import { Flipped, Flipper } from "react-flip-toolkit";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ListItem from "@mui/material/ListItem";

type Props = {
  array: Item[];
  name: string;
  primaryArrowClass?: string[];
  secondaryArrowClass?: string[];
  infoArrowClass?: string[];
};
const ItemsArrayContainer = (props: Props) => {
  const {
    array,
    name,
    primaryArrowClass,
    secondaryArrowClass,
    infoArrowClass,
  } = props;
  const arrowArray = array.map((item) => {
    const { className } = item;
    if (className) {
      if (
        primaryArrowClass &&
        primaryArrowClass.some((value) => className.includes(value))
      )
        return "primary";
      if (
        secondaryArrowClass &&
        secondaryArrowClass.some((value) => className.includes(value))
      )
        return "secondary";
      if (
        infoArrowClass &&
        infoArrowClass.some((value) => className.includes(value))
      )
        return "info";
    }
    return item.name;
  });
  return (
    <Grid container xs={8}>
      <Grid paddingBottom="0" display="flex" alignItems="center" xs={4}>
        <h2>{name}</h2>
      </Grid>
      <Grid paddingBottom="0" xs={8}>
        <List className={styles.list} items={array} />
      </Grid>
      <Grid id="arrow-title-placeholder" paddingTop="0" xs={4}></Grid>
      <Grid paddingTop="0" xs={8}>
        <Flipper flipKey={arrowArray.join("")} element={undefined}>
          <MaterialList className={styles.arrowList}>
            {arrowArray.map((item) => {
              return (
                <Flipped key={item} flipId={item}>
                  <ListItem key={item}>
                    {typeof item === "string" && (
                      <ArrowDropUpIcon fontSize="large" color={item} />
                    )}
                  </ListItem>
                </Flipped>
              );
            })}
          </MaterialList>
        </Flipper>
      </Grid>
    </Grid>
  );
};

export default ItemsArrayContainer;
