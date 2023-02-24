"use client";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useMemo } from "react";
import styles from "./index.module.css";

type Props = {};

const items = Array.from(new Array(10), (x, i) => i + 1);
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const InsertionSortingAlgorithm = (props: Props) => {
  const shuffledItems = useMemo(() => shuffleArray([...items]), [items]);
  return (
    <Box margin="15px 10px">
      <h1>Insertion Algorithm</h1>
      <Grid container spacing={2} marginTop="15px">
        <Grid
          xs={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <h2>Original Array</h2>
          <List className={styles.list}>
            {items.map((item) => {
              return (
                <ListItem key={item} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid
          xs={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <h2>Shuffled Array</h2>
          <List className={styles.list}>
            {shuffledItems.map((item) => {
              return (
                <ListItem key={item} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsertionSortingAlgorithm;
