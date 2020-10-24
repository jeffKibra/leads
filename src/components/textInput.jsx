import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

export default function TextInput(props) {
  const {
    register,
    errors,
    name,
    defaultValue,
    required,
    multiline,
    rows,
    label,
  } = props;
  return (
    <TextField
      multiline={multiline}
      rows={!!multiline ? rows : 1}
      label={label || name}
      // placeholder={name}
      name={name}
      type="text"
      required={required.value}
      inputRef={register({
        required: { ...required },
        // pattern: {
        //   value: /^[a-z0-9_., ]+$/i,
        //   message: "only numbers and characters allowed",
        // },
        // maxLength: { value: 50, message: "limited to 50 characters" },
      })}
      defaultValue={defaultValue || ""}
      error={!!errors[name]?.message}
      helperText={errors[name]?.message}
      variant="outlined"
    />
  );
}

TextInput.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.shape({
    value: PropTypes.bool,
    message: PropTypes.string,
  }),
};
