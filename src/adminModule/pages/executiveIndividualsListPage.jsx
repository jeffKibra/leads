import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { Empty } from "antd";
import { Grid } from "@material-ui/core";

import CustomTable from "../../components/customTable";
import ActionView from "../../components/actionView";
import CustomSkeleton from "../../components/customSkeleton";

export default function ExecutiveIndividualsListPage() {
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: "individuals",
      doc: auth.uid,
      subcollections: [
        {
          collection: "individuals",
        },
      ],
      storeAs: "individuals",
    },
  ]);

  const individuals = useSelector(
    (state) => state.firestore.ordered.individuals
  );

  if (!isLoaded(individuals)) return <CustomSkeleton />;

  if (isEmpty(individuals))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );

  return (
    <>
      <ExecutiveIndividualsList individuals={individuals} />
    </>
  );
}

function createData(date, name, email, handleView) {
  return {
    date,
    name,
    email,
    action: <ActionView handleViewClick={handleView} />,
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

function ExecutiveIndividualsList(props) {
  const { individuals } = props;
  const history = useHistory();

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(individuals);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = individuals.map((individual, index) => {
      const { firstName, lastName, email, date, individualId } = individual;

      const handleView = () => {
        history.push(`${history.location.pathname}/${individualId}`);
      };

      return createData(date, `${firstName} ${lastName}`, email, handleView);
    });

    setDataRows(reloadedRows);
  }, [individuals, history]);

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
      title="Individuals"
    />
  );
}
