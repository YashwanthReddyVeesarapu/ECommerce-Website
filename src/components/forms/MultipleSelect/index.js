import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import React from "react";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     maxWidth: 300,
//   },
//   chips: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   chip: {
//     margin: 10,
//   },
//   noLabel: {
//     marginTop: theme.spacing(3),
//   },
// }));

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default function MultipleSelect({ sizes, handleChange, personName }) {
  const theme = useTheme();

  return (
    <div>
      <FormControl className="">
        <InputLabel id="demo-mutiple-checkbox-label">Size</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {sizes.map((size) => (
            <MenuItem key={size} value={size}>
              <Checkbox checked={personName.indexOf(size) > -1} />
              <ListItemText primary={size} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
