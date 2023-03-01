"use client";

import React from "react";

import MaterialList from "@mui/material/List";
import Box from "@mui/material/Box";
import Page from "@/types/Page";
import ListItem from "./Item";
import StyleProps from "@/types/BaseProps/StyleProps";
import { Flipped, Flipper } from "react-flip-toolkit";

type Props = {
  items: Page[] | string[] | number[];
};

const List = (props: Props & StyleProps) => {
  const { items } = props;
  const base = (
    <MaterialList className={props.className} style={props.style}>
      {items.map((item) => {
        if (typeof item === "object")
          return <ListItem key={item.name} {...item} />;
        return <ListItem key={item} name={item} />;
      })}
    </MaterialList>
  );
  if ("url" in items) return base;
  return <Flipper flipKey={items.join("")}>{base}</Flipper>;
};

export default List;
