import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import ExecutivesListComponent from "../components/executivesListComponent";
import DateChooser from "../../components/dateChooser";

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

  return (
    <>
      <DateChooser onFormSubmit={chooseDate} />
      <ExecutivesListComponent data={dailyLeads} title="Executive Leads" />
    </>
  );
}
