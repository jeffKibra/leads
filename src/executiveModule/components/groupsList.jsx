import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import CustomTable from "../../components/customTable";
import { deleteData } from "../../modules/firestoreActions";
import ActionDelete from "../../components/actionDelete";
import ActionEdit from "../../components/actionEdit";

function createData(date, groupName, handleDelete, handleEdit) {
  return {
    date,
    groupName,
    action: (
      <Grid container justify="space-around">
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
  { id: "groupName", numeric: false, label: "Group Name" },
  { id: "action", numeric: false, label: "Action" },
];

export default function GroupList(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector((state) => state.firebase.auth);
  const { groups } = props;

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(groups);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = groups.map((group, index) => {
      const { groupName, date, groupId } = group;

      const handleDelete = () => {
        dispatch(deleteData(`executives/${auth.uid}/groups`, groupId));
      };

      const handleEdit = () => {
        history.push(`preview/group/${groupId}`);
      };

      return createData(date, groupName, handleDelete, handleEdit);
    });

    setDataRows(reloadedRows);
  }, [groups, dispatch, auth.uid, history]);

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
      title="Groups"
    />
  );
}
