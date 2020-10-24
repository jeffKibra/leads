import React from "react";
import PropTypes from "prop-types";

export default function FormCheck(props) {
  // console.log(props);
  const { register, name, label, registerObject } = props;
  return (
    <div className="form-check">
      <input
        ref={register({
          ...registerObject,
        })}
        className="form-check-input"
        type="checkbox"
        name={name}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
}

FormCheck.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.object,
  registerObject: PropTypes.object.isRequired,
};
