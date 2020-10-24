import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

export default function EmailInput(props) {
  const { register, errors, defaultValue } = props;
  return (
    <TextField
      label="Email"
      placeholder="Email"
      name="email"
      type="email"
      inputMode="email"
      required
      inputRef={register({
        required: { value: true, message: "please provide an email" },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "invalid email address",
        },
      })}
      defaultValue={defaultValue}
      error={!!errors.email?.message}
      helperText={errors.email?.message}
      variant="outlined"
    />
  );
}

EmailInput.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
};
