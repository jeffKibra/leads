import React from "react";
import { ListItemText } from "@material-ui/core";

import DrawerListItem from "../../components/drawerListItem";

export default function ExecutivesNav(props) {
  return (
    <>
      <DrawerListItem to="/doctors">
        <ListItemText primary="Manage Doctors" />
      </DrawerListItem>

      <DrawerListItem to="/addDoctor">
        <ListItemText primary="Add Doctor" />
      </DrawerListItem>
    </>
  );
}
