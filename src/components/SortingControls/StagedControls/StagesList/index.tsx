import { useSortingState } from "@/store/SortingContext";
import List from "@mui/material/List";
import React from "react";
import StageItem from "./StageItem";

type Props = {};

const DetailedStageList = (props: Props) => {
  const sortingCtx = useSortingState();
  const { sortingStages } = sortingCtx.state;
  return (
    <List>
      {sortingStages.map((value, index) => (
        <StageItem key={index + value.name} stage={value} stageNumber={index + 1} />
      ))}
    </List>
  );
};

export default DetailedStageList;
