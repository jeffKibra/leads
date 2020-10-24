import React, { useState } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import PositionedPopper from "../../components/positionedPopper";
import LogoutDialog from "./logoutDialog";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    avatar: {
      cursor: "pointer",
      width: 36,
      height: 36,
    },
    popper: {
      marginTop: 20,
      width: 160,
      padding: theme.spacing(0.5),
    },
    listItem: {
      padding: theme.spacing(0.5, 3),
      justifyContent: "flex-start",
    },
    listItemText: {
      marginLeft: -24,
    },
  };
});

export default function Profile(props) {
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.auth);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleProfile = () => {
    history.push("/profile");
  };

  const handlePopper = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <span>
        {/* <Typography></Typography> */}
        <Avatar
          onClick={handlePopper}
          className={classes.avatar}
          alt="profile picture"
          src={auth.photoURL}
        />
      </span>
      <PositionedPopper
        styles={classes.popper}
        placement="bottom"
        open={open}
        anchorEl={anchorEl}
      >
        <List>
          <ListItem button onClick={handleProfile} className={classes.listItem}>
            <ListItemIcon>
              <FontAwesomeIcon icon="user" />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="Profile" />
          </ListItem>
          <LogoutDialog
            render={(handleLogout) => {
              return (
                <ListItem
                  button
                  onClick={handleLogout}
                  className={classes.listItem}
                >
                  <ListItemIcon>
                    <FontAwesomeIcon icon="sign-out-alt" />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.listItemText}
                    primary="Logout"
                  />
                </ListItem>
              );
            }}
          />
        </List>
      </PositionedPopper>
    </>
  );
}
