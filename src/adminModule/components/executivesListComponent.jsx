import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import CustomTable from "../../components/customTable";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";
import Actions from "../../components/actionsShare";
import { deleteData } from "../../modules/firestoreActions";

function createData(
  date,
  name,
  email,
  contact,
  isBlock,
  imageURL,
  password,
  id,
  handleDelete
) {
  const text = `email : ${email}, password : ${password}`;
  return {
    date,
    name,
    email,
    contact,
    isBlock,
    image: <Avatar variant="rounded" alt="executive image" src={imageURL} />,
    action: (
      <Actions
        text={text}
        email={email}
        handleDelete={() => handleDelete(id)}
        editRoute={`/editexecutive/${id}`}
        id={id}
      />
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
  { id: "contact", numeric: false, label: "Contact" },
  { id: "isBlock", numeric: false, label: "IsBlock" },
  { id: "image", numeric: false, label: "Image" },
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
      const {
        firstName,
        lastName,
        email,
        date,
        contact,
        isBlock,
        imageURL,
        password,
        executiveId,
      } = executive;
      return createData(
        date,
        `${firstName} ${lastName}`,
        email,
        contact,
        isBlock,
        imageURL,
        password,
        executiveId,
        handleDelete
      );
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
