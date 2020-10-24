import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PropTypes from "prop-types";

export default function PasswordInput(props) {
  const { name, label, register, errors, autoFocus, defaultValue } = props;
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
        required: { value: true, message: "required field" },
        minLength: {
          value: 8,
          message: "password must be atleast 8 characters long",
        },
        // pattern: {
        //   value: /^(?:[a-z]+[0-9]|[0-9]+[a-z])[a-z0-9]*$/i,
        //   message: "please include at least one character and number",
        // },
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

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
};
