import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory, useParams } from "react-router-dom";
import { Empty } from "antd";
import { Grid } from "@material-ui/core";

import CustomTable from "../../components/customTable";
import ActionView from "../../components/actionView";
import CustomSkeleton from "../../components/customSkeleton";

export default function GroupsListPage() {
  const params = useParams();
  const { executiveId } = params;
  useFirestoreConnect([
    {
      collection: "executives",
      doc: executiveId,
      subcollections: [
        {
          collection: "groups",
        },
      ],
      storeAs: "groups",
    },
  ]);

  const groups = useSelector((state) => state.firestore.ordered.groups);

  if (!isLoaded(groups)) return <CustomSkeleton />;

  if (isEmpty(groups))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );

  return (
    <>
      <GroupsList groups={groups} />
    </>
  );
}

function createData(date, groupName, quiz, handleView) {
  return {
    date,
    groupName,
    quiz,
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
  { id: "groupName", numeric: false, label: "Group Name" },
  { id: "quiz", numeric: false, label: "Assigned Quiz" },
  { id: "action", numeric: false, label: "Action" },
];

function GroupsList(props) {
  const { groups } = props;
  const history = useHistory();

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(groups);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = groups.map((group, index) => {
      const { groupName, date, groupId } = group;

      const handleView = () => {
        history.push(`${history.location.pathname}/${groupId}`);
      };

      return createData(
        date,
        groupName,
        //quiz
        handleView
      );
    });

    setDataRows(reloadedRows);
  }, [groups, history]);

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
