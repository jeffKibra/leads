import React, { useState } from "react";
import { Menu as MaterialMenu, IconButton } from "@material-ui/core";
import { MoreOutlined } from "@ant-design/icons";

const MoreMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {" "}
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {" "}
        <MoreOutlined />{" "}
      </IconButton>{" "}
      <MaterialMenu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
      >
        {props.render(handleClose)}
      </MaterialMenu>{" "}
    </div>
  );
};

export default MoreMenu;
