import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Visibility } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import CustomTable from "../../components/customTable";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";
//import Actions from "../../components/actionsShare";
import { deleteData } from "../../modules/firestoreActions";

function See(props) {
  console.log(props);
  const history = useHistory();
  const { executiveId, date } = props;

  const handleSee = () => {
    history.push(`/executiveLeads/${executiveId}/${date}`);
  };

  return (
    <IconButton onClick={handleSee}>
      <Visibility />
    </IconButton>
  );
}

function createData(date, name, leads, id, handleDelete) {
  //const text = `email : ${email}, password : ${password}`;
  return {
    date,
    name,
    leads,
    action: <See executiveId={id} date={date} />,
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
  { id: "leads", numeric: false, label: "Leads" },
  { id: "action", numeric: false, label: "Action" },
];

function ExecutivesListComponent(props) {
  const dispatch = useDispatch();
  const { loadedData } = props;
  console.log(loadedData);

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(loadedData);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const handleDelete = (id) => {
      dispatch(deleteData("executives", id));
    };

    const reloadedRows = loadedData.map((executive, index) => {
      const { name, date, leads, executiveId } = executive;
      return createData(date, name, leads, executiveId, handleDelete);
    });

    setDataRows(reloadedRows);
  }, [loadedData, dispatch]);

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
      title="Executives"
    />
  );
}

export default IsLoadedIsEmptyHOC(ExecutivesListComponent);
