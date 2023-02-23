"use client"

import React from "react";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Page from "@/types/Page";
import AlgorithmsListItem from "./Item";

type Props = {
  pages: Page[];
};

const AlgorithmsList = (props: Props) => {
  const { pages } = props;
  return (
    <Box>
      <List>
        {pages.map((page) => {
          return <AlgorithmsListItem key={page.name} page={page} />;
        })}
      </List>
    </Box>
  );
};

export default AlgorithmsList;
