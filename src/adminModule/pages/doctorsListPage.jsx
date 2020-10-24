import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Empty } from "antd";

import CustomTable from "../../components/customTable";
import ActionView from "../../components/actionView";
import CustomSkeleton from "../../components/customSkeleton";

export default function ExecutivesListPage() {
  useFirestoreConnect([
    {
      collectionGroup: "doctors",
      //orderBy: "date",
    },
  ]);

  let doctors = useSelector((state) => state.firestore.data.doctors);
  if (!isLoaded(doctors)) return <CustomSkeleton />;
  if (isEmpty(doctors))
    return (
      <Grid>
        <Empty description="No doctors!" />
      </Grid>
    );
  doctors = Object.values(doctors);

  return (
    <>
      <DoctorsList doctors={doctors} />
    </>
  );
}

function createData(date, name, email, handleView) {
  return {
    date,
    name,
    email,
    action: (
      <Grid container justify="center">
        <ActionView handleViewClick={handleView} />
      </Grid>
    ),
  };
}

const headCells = [
  {
    id: "number",
    numeric: false,
    label: "No.",
  },
  { id: "date", numeric: false, label: "Date" },
  { id: "name", numeric: false, label: "Name" },
  { id: "email", numeric: false, label: "Email" },
  { id: "action", numeric: false, label: "Action" },
];

function DoctorsList(props) {
  const history = useHistory();
  const { doctors } = props;

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(doctors);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = doctors.map((doctor, index) => {
      const {
        firstName,
        lastName,
        email,
        date,
        doctorId,
        executiveId,
      } = doctor;

      const handleView = () => {
        history.push(`${history.location.pathname}/${executiveId}/${doctorId}`);
      };

      return createData(date, `${firstName} ${lastName}`, email, handleView);
    });

    setDataRows(reloadedRows);
  }, [doctors, history]);

  const handleSearch = (value) => {
    const newData = dataRows.filter(
      (row) => row.name.toUpperCase().indexOf(value) > -1
    );

    setRows(newData);
  };

  return (
    <CustomTable
      handleSearch={handleSearch}
      rows={rows}
      headCells={headCells}
      title="Doctors"
    />
  );
}
