import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid } from "@material-ui/core";
import { Empty } from "antd";

import ExecutiveLeadsReport from "../components/executiveLeadsReport";
import DateChooser from "../../components/dateChooser";
import CustomSkeleton from "../../components/customSkeleton";

export default function ExecutivesListPage() {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  useFirestoreConnect([
    {
      collectionGroup: "dailyLeads",
      where: ["date", "==", date],
      storeAs: "dailyLeads",
    },
  ]);

  const chooseDate = (data) => {
    console.log(data);
    setDate(data.date);
  };

  const dailyLeads = useSelector((state) => state.firestore.ordered.dailyLeads);
  console.log(dailyLeads);

  if (!isLoaded(dailyLeads)) return <CustomSkeleton />;
  

  return (
    <>
      <DateChooser onFormSubmit={chooseDate} />
      {isEmpty(dailyLeads) ?  <Grid container justify="center">
        <Empty />
      </Grid> : <ExecutiveLeadsReport dailyLeads={dailyLeads} title="Executive Leads" />
    }
    </>
  );
}
