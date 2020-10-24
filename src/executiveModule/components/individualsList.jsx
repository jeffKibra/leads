import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import CustomTable from "../../components/customTable";
import ActionEdit from "../../components/actionEdit";
import ActionDelete from "../../components/actionDelete";
import ActionShare from "../../components/actionShare";
import { deleteData } from "../../modules/firestoreActions";

function createData(date, name, email, handleDelete, handleEdit, executiveId) {
  return {
    date,
    name,
    email,
    action: (
      <Grid container justify="space-around">
        <ActionShare
          email={email}
          text={`https://playquizleads.web.app/playQuiz/singleQuiz/${executiveId}`}
        />
        <ActionEdit handleEditClick={handleEdit} />
        <ActionDelete handleDelete={handleDelete} />
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

export default function IndividualsList(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector((state) => state.firebase.auth);
  const { individuals } = props;

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(individuals);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = individuals.map((individual, index) => {
      const { firstName, lastName, email, date, individualId } = individual;

      const handleDelete = () => {
        dispatch(
          deleteData(`executives/${auth.uid}/individuals`, individualId)
        );
      };

      const handleEdit = () => {
        history.push(`/preview/individual/${individualId}`);
      };

      return createData(
        date,
        `${firstName} ${lastName}`,
        email,
        handleDelete,
        handleEdit,
        auth.uid
      );
    });

    setDataRows(reloadedRows);
  }, [individuals, dispatch, auth.uid, history]);

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
