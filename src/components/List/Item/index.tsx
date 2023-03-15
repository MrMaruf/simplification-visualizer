import Page from "@/types/Page";
import React from "react";

import MaterialListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Flipped } from "react-flip-toolkit";
import StyleProps from "@/types/BaseProps/StyleProps";

import styles from "./index.module.css";

type Props = {
  name: string | number;
  url?: string;
  description?: string;
};

const ListItem = (props: Props & StyleProps) => {
  const { name, url: href } = props;
  if (href) {
    return (
      <Flipped key={name} flipId={name}>
        <MaterialListItem
          disablePadding
          className={styles.item + " " + props.className ?? ""}
          style={props.style}
        >
          <ListItemButton href={href}>
            <ListItemText primary={name} secondary={props.description} />
          </ListItemButton>
        </MaterialListItem>
      </Flipped>
    );
  }
  return (
    <Flipped key={name} flipId={name}>
      <MaterialListItem
        disablePadding
        className={styles.item + " " + props.className ?? ""}
        style={props.style}
      >
        <ListItemText primary={props.name} secondary={props.description} />
      </MaterialListItem>
    </Flipped>
  );
};

export default ListItem;
