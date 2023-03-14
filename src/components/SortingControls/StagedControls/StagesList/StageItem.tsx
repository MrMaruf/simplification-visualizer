import { Stage } from "@/types/store/SortingTypes";
import { useSortingState } from "@/store/SortingContext";
import React, { useEffect, useRef } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

type Props = {
  stage: Stage;
  stageNumber: number;
};

const StageItem = (props: Props) => {
  const sortingCtx = useSortingState();
  const { currentStage } = sortingCtx.state;
  const { stage, stageNumber } = props;
  const onClick = () => {
    sortingCtx.dispatch({ type: "move stage", newStage: stageNumber });
  };
  const itemRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    if (stageNumber === currentStage) {
      itemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  }, [currentStage, stageNumber]);

  return (
    <ListItem ref={itemRef}>
      <ListItemButton onClick={onClick} selected={currentStage === stageNumber}>
        <ListItemText primary={`${stageNumber}. ${stage.name}`} secondary={stage.description} />
      </ListItemButton>
    </ListItem>
  );
};

export default StageItem;
