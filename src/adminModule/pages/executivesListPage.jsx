import React from "react";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import ExecutivesListComponent from "../components/executivesListComponent";

export default function ExecutivesListPage() {
  useFirestoreConnect([
    {
      collection: "executives", 
    },
  ]);

  const executives = useSelector((state) => state.firestore.ordered.executives);
  console.log(executives);

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Button
          component={Link}
          to="/addExecutive"
          endIcon={<FontAwesomeIcon icon="plus" />}
        >
          add
        </Button>
      </Grid>
      <ExecutivesListComponent data={executives} title="Executives" />
    </>
  );
}
