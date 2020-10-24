import React, { useState } from "react";
import { WhatsappShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Menu as MaterialMenu,
  IconButton,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { WhatsApp, EmailOutlined, FileCopyOutlined } from "@material-ui/icons";

import CopyToClipboard from "./copyToClipboard";

export default function ActionShare(props) {
  const { text, email } = props;

  return (
    <>
      <MoreMenu
        render={(handleClose) => {
          return (
            <span>
              <CopyToClipboard text={text}>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <FileCopyOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Copy" />
                </MenuItem>
              </CopyToClipboard>

              <MenuItem
                onClick={handleClose}
                component="a"
                target="_blank"
                href={`mailto:${email}?subject=Credentials&body=${text}`}
              >
                <ListItemIcon>
                  <EmailOutlined />
                </ListItemIcon>
                <ListItemText primary="Email" />
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <MenuItem
                  component={WhatsappShareButton}
                  title="Credentials"
                  url={text}
                >
                  <ListItemIcon>
                    <WhatsApp />
                  </ListItemIcon>
                  <ListItemText primary="WhatsApp" />
                </MenuItem>
              </MenuItem>
            </span>
          );
        }}
      />
    </>
  );
}

ActionShare.propTypes = {
  text: PropTypes.any.isRequired,
  email: PropTypes.string.isRequired,
};

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
        <FontAwesomeIcon icon="share-alt" />
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
