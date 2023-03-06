"use client";

import React from "react";

import MaterialList from "@mui/material/List";
import Box from "@mui/material/Box";
import Page from "@/types/Page";
import ListItem from "./Item";
import StyleProps from "@/types/BaseProps/StyleProps";
import { Flipper } from "react-flip-toolkit";
import { Items } from "@/types/store/SortingTypes";

type Props = {
  items: Page[] | string[] | number[] | Items;
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
  if (typeof items[0] === "object" && "url" in items[0]) return base;
  return (
    <Flipper
      flipKey={items
        .map((value) => {
          if (typeof value === "object") return value.name;
          return value;
        })
        .join("")}
    >
      {base}
    </Flipper>
  );
};

export default List;
