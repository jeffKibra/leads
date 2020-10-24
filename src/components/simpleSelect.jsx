import React, { useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  Select,
  InputLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";

export default function SimpleSelect(props) {
  const {
    name,
    label,
    children,
    register,
    errors,
    defaultValue,
    setValue,
  } = props;

  useEffect(() => {
    console.log("register has changed");
    register(name, {
      required: { value: true, message: "required" },
    });
    setValue(name, defaultValue);
  }, [register, defaultValue, setValue, name]);

  const handleSelectChange = (e) => {
    setValue(name, e.target.value);
  };

  return (
    <FormControl
      required
      size="small"
      variant="outlined"
      error={!!errors[name]?.message}
    >
      <InputLabel htmlFor={name}>{label || name}</InputLabel>
      <Select
        labelId={label || name}
        error={errors[name]?.message}
        name={name}
        id={name}
        defaultValue={defaultValue}
        inputProps={{
          name: name,
          id: name,
        }}
        onChange={handleSelectChange}
      >
        {children}
      </Select>
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

SimpleSelect.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
};
