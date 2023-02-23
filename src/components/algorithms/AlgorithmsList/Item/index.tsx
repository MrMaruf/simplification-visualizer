

import Page from "@/types/Page";
import React from "react";


import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

type Props = {
  page: Page;
};

const AlgorithmsListItem = (props: Props) => {
  const { page } = props;
  return (
    <ListItem key={page.name} disablePadding>
      <ListItemButton href={page.url}>
        <ListItemText primary={page.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default AlgorithmsListItem;
