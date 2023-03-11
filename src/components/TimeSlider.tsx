import React, { useRef, useState } from "react";

import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
type Props = {
  value: number;
  onValueChange?: (value: number) => void;
  onChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  disabled?: boolean;
};

const marks = [
  {
    value: 100,
    label: "100ms",
  },
  {
    value: 300,
    label: "300ms",
  },
  {
    value: 1000,
    label: "1s",
  },
];

//TODO: Optimize on change. At the moment it runs way too often. Maybe with timeout?
const TimeSlider = (props: Props) => {
  const changeFinishedTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const { onValueChange, onChange, value: passedValue, disabled } = props;
  const [value, setValue] = useState(passedValue);

  const clearChangeTimeout = () => {
    if (changeFinishedTimeout.current)
      clearTimeout(changeFinishedTimeout.current);
  };

  const startChangeTimeout = (value: number) => {
    if (!onValueChange) return;
    clearChangeTimeout();
    const timeout = setTimeout(() => {
      onValueChange(value);
    }, 400);
    changeFinishedTimeout.current = timeout;
  };

  return (
    <React.Fragment>
      <Typography id="sorting-speed" gutterBottom>
        Staging speed
      </Typography>
      <Slider
        track={false}
        aria-labelledby="sorting-speed"
        min={100}
        max={1000}
        marks={marks}
        value={value}
        disabled={disabled}
        onChange={(event, value, activeThumb) => {
          if (onChange) onChange(event, value, activeThumb);
          if (typeof value === "number") {
            setValue(value);
            startChangeTimeout(value);
          }
        }}
      />
      {props.value < 300 && (
        <Typography id="warning-text" color="orange" gutterBottom>
          Speed set below 300ms might cause weird behaviour on lower-range PCs
        </Typography>
      )}
    </React.Fragment>
  );
};

export default TimeSlider;
