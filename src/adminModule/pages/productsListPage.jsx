import React from "react";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import ProductsListComponent from "../components/productsListComponent";

export default function ProductsListPage() {
  useFirestoreConnect([
    {
      collection: "products",
    },
  ]);

  const products = useSelector((state) => state.firestore.ordered.products);
  console.log(products);

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Button
          component={Link}
          to="/addProduct"
          endIcon={<FontAwesomeIcon icon="plus" />}
        >
          add
        </Button>
      </Grid>
      <ProductsListComponent data={products} title="Products" />
    </>
  );
}
