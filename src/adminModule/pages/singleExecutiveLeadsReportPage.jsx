import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { Empty } from "antd";
import { Grid } from "@material-ui/core";

import SingleExecutiveLeadReport from "../components/singleExecutiveLeadsReport";
import CustomSkeleton from "../../components/customSkeleton";
import DateChooser from '../../components/dateChooser'

export default function ExecutivesListPage() {
  const params = useParams();
  const { executiveId } = params;
  const predefinedDate=params.date
  const [date, setDate]=useState(predefinedDate)

  useFirestoreConnect([
    {
      collection: "executives",
      doc: executiveId,
      subcollections: [
        {
          collection: "leads",
          where: ["date", "==", date],
          storeAs: "leads",
        },
      ],
      storeAs: "leads",
    },
    {
      collection: "executives",
      doc: executiveId,
      storeAs: "executive",
    },
  ]);

  const selectDate=(data)=>{
    setDate(data.date)
  }

  const executive = useSelector((state) => state.firestore.data.executive);
  const leads = useSelector((state) => state.firestore.ordered.leads);
  console.log(leads, executive);

  if (!isLoaded(executive) || !isLoaded(leads)) return <CustomSkeleton />;
  

  return (
    <>
    <DateChooser onFormSubmit={selectDate} />
    { isEmpty(executive) || isEmpty(leads) ?  <Grid container justify="center">
        <Empty />
      </Grid> : <SingleExecutiveLeadReport leads={leads} title={`Leads - ${executive.firstName} ${executive.lastName}`} /> 
    }
    </>
  );
}
