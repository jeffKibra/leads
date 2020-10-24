import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Empty } from "antd";

import BarGraph from "../../components/barGraph";
import CustomSkeleton from "../../components/customSkeleton";

export default function Graph(props) {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const numberOfDays = new Date(year, month, 0).getDate();
  const startDate = new Date(year, month, 1).toISOString().substr(0, 10);
  const endDate = new Date(year, month + 1, 1).toISOString().substr(0, 10);

  useFirestoreConnect([
    {
      collection: "adminDailyLeads",
      where: [
        ["date", ">=", startDate],
        ["date", "<=", endDate],
      ],
    },
  ]);

  const adminDailyLeads = useSelector(
    (state) => state.firestore.ordered.adminDailyLeads
  );
  if (!isLoaded(adminDailyLeads)) return <CustomSkeleton loading={true} />;
  console.log({ adminDailyLeads, startDate, endDate });
  return (
    <Grid container justify="center">
      <Grid item xs={12} container justify="center">
        {isEmpty(adminDailyLeads) ? (
          <Empty />
        ) : (
          <BarGraph
            month={month}
            year={year}
            rawData={adminDailyLeads}
            numberOfDays={numberOfDays}
          />
        )}
      </Grid>
    </Grid>
  );
}
