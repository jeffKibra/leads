import React, { useState } from "react";
import { Popper, Card, CardContent } from "@material-ui/core";

export default function SimplePopper(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { render, children } = props;
  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <div>
      {render(handleClick)}
      <Popper
        style={{ width: 500, maxWidth: "80%", zIndex: 10 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
      >
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </Popper>
    </div>
  );
}
