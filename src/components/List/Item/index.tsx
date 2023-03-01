import Page from "@/types/Page";
import React from "react";

import MaterialListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Flipped } from "react-flip-toolkit";

type Props = {
  name: string | number;
  url?: string;
};

const ListItem = (props: Props) => {
  const { name, url: href } = props;
  if (href) {
    return (
      <MaterialListItem disablePadding>
        <ListItemButton href={href}>
          <ListItemText primary={name} />
        </ListItemButton>
      </MaterialListItem>
    );
  }
  return (
    <Flipped key={name} flipId={name}>
      <MaterialListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={props.name} />
        </ListItemButton>
      </MaterialListItem>
    </Flipped>
  );
};

export default ListItem;
