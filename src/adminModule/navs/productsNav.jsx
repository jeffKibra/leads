import React from "react";
import { ListItemText } from "@material-ui/core";

import DrawerListItem from "../../components/drawerListItem";

export default function ProductsNav(props) {
  return (
    <>
      <DrawerListItem to="/productsList">
        <ListItemText primary="Manage Products" />
      </DrawerListItem>

      <DrawerListItem to="/addProduct">
        <ListItemText primary="Add Product" />
      </DrawerListItem>
    </>
  );
}
