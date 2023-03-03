import React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SortingType from "@/types/SortType";

type Props = {
  value: SortingType;
  onChange: (value: SortingType) => void;
};

const SortTypeSelector = (props: Props) => {
  const { onChange, value } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id="sort-type-label">Sort Type</InputLabel>
      <Select
        labelId="sort-type-label"
        id="sort-type"
        value={value}
        label="Sort Type"
        onChange={(event) => {
          const target = event.target;
          const value = target.value as SortingType;
          onChange(value);
        }}
      >
        <MenuItem value="realtime">Realtime sorting</MenuItem>
        <MenuItem value={"staged automatic"}>
          Slowed step-by-step sorting
        </MenuItem>
        <MenuItem value={"staged manual"}>Manual stage controls</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortTypeSelector;
