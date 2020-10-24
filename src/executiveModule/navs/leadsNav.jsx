import React from "react";
import { ListItemText } from "@material-ui/core";

import DrawerListItem from "../../components/drawerListItem";

export default function LeadsNav(props) {
  return (
    <>
      <DrawerListItem to="/leadsList">
        <ListItemText primary="Leads" />
      </DrawerListItem>

      <DrawerListItem to="/addLead">
        <ListItemText primary="Add Lead" />
      </DrawerListItem>
    </>
  );
}
