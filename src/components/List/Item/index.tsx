import Page from "@/types/Page";
import React from "react";

import MaterialListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Flipped } from "react-flip-toolkit";
import StyleProps from "@/types/BaseProps/StyleProps";

type Props = {
  name: string | number;
  url?: string;
};

const ListItem = (props: Props & StyleProps) => {
  const { name, url: href } = props;
  if (href) {
    return (
      <Flipped key={name} flipId={name}>
        <MaterialListItem
          disablePadding
          className={props.className ?? ""}
          style={props.style}
        >
          <ListItemButton href={href}>
            <ListItemText primary={name} />
          </ListItemButton>
        </MaterialListItem>
      </Flipped>
    );
  }
  return (
    <Flipped key={name} flipId={name}>
      <MaterialListItem
        disablePadding
        className={props.className ?? ""}
        style={props.style}
      >
        <ListItemButton>
          <ListItemText primary={props.name} />
        </ListItemButton>
      </MaterialListItem>
    </Flipped>
  );
};

export default ListItem;
