import React, { useState } from "react";
import { Switch } from "@material-ui/core";

function SwitchToggle(props) {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div>
      <Switch
        checked={checked}
        onChange={handleChange}
        name="toggle"
        inputProps={{ "aria-label": "checkbox" }}
      />
    </div>
  );
}

export default SwitchToggle;
