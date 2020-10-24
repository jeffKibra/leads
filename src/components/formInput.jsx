import React from "react";
import PropTypes from "prop-types";

export default function FormInput(props) {
  const { register, errors, name, type, registerObject, defaultValue } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>
        <p className=" my-0 py-0 d-inline text-left">
          {name} :{" "}
          <small className="text-danger ">*{errors[name]?.message}</small>
        </p>
      </label>
      <input
        ref={register({
          ...registerObject,
        })}
        type={type}
        name={name}
        className="form-control"
        placeholder={name}
        defaultValue={defaultValue || ""}
      />
    </div>
  );
}

FormInput.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  registerObject: PropTypes.object.isRequired,
};
