import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { Empty } from "antd";
import { Grid } from "@material-ui/core";

import CustomTable from "../../components/customTable";
import ActionView from "../../components/actionView";
import CustomSkeleton from "../../components/customSkeleton";

export default function GroupsQuizReportPage() {
  useFirestoreConnect([
    {
      collectionGroup: "groups",
      orderBy: "date",
    },
  ]);

  let groups = useSelector((state) => state.firestore.data.groups);

  if (!isLoaded(groups)) return <CustomSkeleton />;

  if (isEmpty(groups))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );

  groups = Object.values(groups);

  return (
    <>
      <GroupsQuizReport groups={groups} />
    </>
  );
}

function createData(date, groupName, handleView) {
  return {
    date,
    groupName,
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
  { id: "action", numeric: false, label: "Action" },
];

function GroupsQuizReport(props) {
  const { groups } = props;
  const history = useHistory();

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(groups);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = groups.map((group, index) => {
      const { groupName, date, groupId, executiveId } = group;

      const handleView = () => {
        history.push(`${history.location.pathname}/${executiveId}/${groupId}`);
      };

      return createData(date, groupName, handleView);
    });

    setDataRows(reloadedRows);
  }, [groups, history]);

  const handleSearch = (value) => {
    const newData = dataRows.filter(
      (row) => row.groupName.toUpperCase().indexOf(value) > -1
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
