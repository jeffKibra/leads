import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory, useParams } from "react-router-dom";
import { Empty } from "antd";
import { Grid } from "@material-ui/core";

import CustomTable from "../../components/customTable";
import ActionView from "../../components/actionView";
import CustomSkeleton from "../../components/customSkeleton";

export default function GroupMembersListPage() {
  const params = useParams();
  const { executiveId, groupId } = params;

  useFirestoreConnect([
    {
      collection: "executives",
      doc: executiveId,
      subcollections: [
        {
          collection: "groups",
          doc: groupId,
          subcollections: [
            {
              collection: "members",
            },
          ],
        },
      ],
      storeAs: "members",
    },
  ]);

  const members = useSelector((state) => state.firestore.ordered.members);

  if (!isLoaded(members)) return <CustomSkeleton />;

  if (isEmpty(members))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );

  return (
    <>
      <GroupMembersList groupMembers={members} />
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

function GroupMembersList(props) {
  const { groupMembers } = props;
  const history = useHistory();

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(groupMembers);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = groupMembers.map((member, index) => {
      const { firstName, lastName, email, date, memberId } = member;

      const handleView = () => {
        history.push(`${history.location.pathname}/${memberId}`);
      };

      return createData(date, `${firstName} ${lastName}`, email, handleView);
    });

    setDataRows(reloadedRows);
  }, [groupMembers, history]);

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
      title="Group Members"
    />
  );
}
