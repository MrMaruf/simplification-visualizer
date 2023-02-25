import Page from "@/types/Page";
import React from "react";

import MaterialListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

type Props = {
  name: string | number;
  href?: string;
};

const ListItem = (props: Props) => {
  const { name, href } = props;
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
    <MaterialListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={props.name} />
      </ListItemButton>
    </MaterialListItem>
  );
};

export default ListItem;
