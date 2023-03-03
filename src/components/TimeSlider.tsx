import React from "react";

import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

type Props = {
  value: number;
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

const TimeSlider = (props: Props) => {
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
        {...props}
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
