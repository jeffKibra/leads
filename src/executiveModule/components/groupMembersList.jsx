import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import CustomTable from "../../components/customTable";
import ActionEdit from "../../components/actionEdit";
import ActionDelete from "../../components/actionDelete";
import ActionShare from "../../components/actionShare";
import { deleteData } from "../../modules/firestoreActions";

function createData(
  date,
  name,
  email,
  handleDelete,
  handleEdit,
  groupId,
  executiveId
) {
  return {
    date,
    name,
    email,
    action: (
      <Grid container justify="space-around">
        <ActionShare
          email={email}
          text={`https://playquizleads.web.app/playQuiz/groupQuiz/${executiveId}/${groupId}`}
        />
        <ActionEdit handleEditClick={handleEdit} />
        <ActionDelete handleDelete={handleDelete} />
      </Grid>
    ),
  };
}
// window.location.origin
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

export default function GroupMembersList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  console.log({ history, window: window.location });
  const { groupId } = params;

  const auth = useSelector((state) => state.firebase.auth);
  const { groupMembers } = props;

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(groupMembers);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = groupMembers.map((member, index) => {
      const { firstName, lastName, email, date, memberId } = member;

      const handleDelete = () => {
        dispatch(
          deleteData(
            `executives/${auth.uid}/groups/${groupId}/members`,
            memberId
          )
        );
      };

      const handleEdit = () => {
        history.push(`/editGroupMember/${groupId}/${memberId}`);
      };

      return createData(
        date,
        `${firstName} ${lastName}`,
        email,
        handleDelete,
        handleEdit,
        groupId,
        auth.uid
      );
    });

    setDataRows(reloadedRows);
  }, [groupMembers, dispatch, auth.uid, groupId, history]);

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
      title="Members"
    />
  );
}
