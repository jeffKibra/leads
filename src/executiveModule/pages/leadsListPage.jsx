import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import LeadsListComponent from "../components/leadsListComponent";
import DateChooser from "../../components/dateChooser";

export default function LeadsListPage() {
  const auth = useSelector((state) => state.firebase.auth);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "leads",
          where: ["date", "==", date],
          storeAs: "leads",
        },
      ],
      storeAs: "leads",
    },
  ]);

  const searchByDate = (data) => {
    console.log(data);
    setDate(data.date);
  };

  const leads = useSelector((state) => state.firestore.ordered.leads);

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Button
          component={Link}
          to="/addlead"
          endIcon={<FontAwesomeIcon icon="plus" />}
        >
          add
        </Button>
      </Grid>
      <DateChooser onFormSubmit={searchByDate} />

      <LeadsListComponent data={leads} title="leads" />
    </>
  );
}
