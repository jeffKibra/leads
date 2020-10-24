import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

export default function TextInput(props) {
  const { register, errors, name, label, defaultValue, required } = props;
  return (
    <TextField
      label={label || name}
      placeholder={label || name}
      name={name}
      type="number"
      inputMode="numeric"
      required={required.value}
      inputRef={register({
        required: { ...required },
        pattern: {
          value: /^[0-9. ]+$/i,
          message: "invalid input",
        },
        maxLength: { value: 50, message: "limited to 50 characters" },
      })}
      defaultValue={defaultValue}
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
  required: PropTypes.shape({
    value: PropTypes.bool,
    message: PropTypes.string,
  }),
};
