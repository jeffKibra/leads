import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PropTypes from "prop-types";

export default function PasswordConfirmInput(props) {
  const {
    name,
    label,
    register,
    errors,
    autoFocus,
    defaultValue,
    watch,
  } = props;
  const [visible, setVisible] = useState(false);

  const showPassword = () => {
    setVisible(!visible);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      autoFocus={autoFocus}
      label={label || name}
      placeholder={label || name}
      name={name}
      type={visible ? "text" : "password"}
      defaultValue={defaultValue}
      variant="outlined"
      inputRef={register({
        validate: (value) =>
          value === watch("password") || "passwords do not match",
        required: { value: true, message: "required field" },
      })}
      error={!!errors[name]?.message}
      helperText={errors[name]?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={showPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

PasswordConfirmInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
  watch: PropTypes.func.isRequired,
};
