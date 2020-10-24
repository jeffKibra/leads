import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, IconButton } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";

import CustomTable from "../../components/customTable";
import DeleteDialogue from "../../components/deleteDialogue";

function Actions(props) {
  const history = useHistory();

  const handleEditClick = () => {
    history.push("/editExecutive");
  };

  const onTrashClick = () => {
    console.log("deleted");
  };

  return (
    <Grid container justify="space-around">
      <IconButton onClick={handleEditClick} color="primary">
        <FontAwesomeIcon icon="edit" />
      </IconButton>
      <DeleteDialogue
        onTrashClick={onTrashClick}
        render={(handleClickOpen) => (
          <IconButton onClick={handleClickOpen}>
            <FontAwesomeIcon style={{ color: "red" }} icon="trash-alt" />
          </IconButton>
        )}
      />
    </Grid>
  );
}

function createData(name, isBlock) {
  return { name, isBlock, action: <Actions name={name} /> };
}

const rows = [
  createData("Timothy Oluka", "false"),
  createData("Christopher Elokada", "false"),
  createData("Winfred Propus", "false"),
  createData("Christine Nyaike", "false"),
  createData("Boniface usoji", "false"),
  createData("Kelvin kleive", "false"),
  createData("Wilson Nyamae", "false"),
  createData("Peter Okelo", "false"),
  createData("John Babalake", "false"),
  createData("Antony Claine", "false"),
  createData("Purposed Uchile", "false"),
  createData("Blessings Plus", "false"),
  createData("Classics Reborn", "false"),
];

export default function ExecutivesListPage() {
  const headCells = [
    {
      id: "number",
      numeric: false,
      label: "No.",
    },
    { id: "name", numeric: false, label: "Name" },
    { id: "isBlock", numeric: false, label: "isBlock" },
    { id: "action", numeric: false, label: "Action" },
  ];

  const [dataRows, setDataRows] = useState(rows);

  // useEffect(() => {
  //   console.log("updated");
  //   setDataRows(rows);
  // }, [rows]);

  const handleSearch = (value) => {
    const newData = rows.filter(
      (row) => row.name.toUpperCase().indexOf(value) > -1
    );

    setDataRows(newData);
  };

  return (
    <>
      <Grid container justify="center">
        <Button
          component={Link}
          to="/addExecutive"
          endIcon={<FontAwesomeIcon icon="plus" />}
        >
          add
        </Button>
      </Grid>
      <CustomTable
        handleSearch={handleSearch}
        rows={dataRows}
        headCells={headCells}
        title="Executives"
      />
    </>
  );
}
