import React from "react";
import { TextField } from "@material-ui/core";

export default function DateInput(props) {
  const { register, errors, defaultValue } = props;
  return (
    <TextField
      name="date"
      label="Date"
      type="date"
      inputRef={register({
        required: { value: true, message: "date required" },
      })}
      InputLabelProps={{ shrink: true }}
      defaultValue={defaultValue}
      error={errors?.date?.message}
      helperText={errors?.date?.message}
    />
  );
}
