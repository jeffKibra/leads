import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory, useParams } from "react-router-dom";
import { Empty } from "antd";
import { Grid } from "@material-ui/core";

import CustomTable from "../../components/customTable";
import ActionView from "../../components/actionView";
import CustomSkeleton from "../../components/customSkeleton";

export default function GroupMemberReportsListPage() {
  const params = useParams();
  const { executiveId, groupId, memberId } = params;

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
              doc: memberId,
              subcollections: [
                {
                  collection: "reports",
                },
              ],
            },
          ],
        },
      ],

      storeAs: "reportsList",
    },
  ]);

  const reportsList = useSelector(
    (state) => state.firestore.ordered.reportsList
  );

  if (!isLoaded(reportsList)) return <CustomSkeleton />;

  if (isEmpty(reportsList))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );

  return (
    <>
      <GroupMemberReportsList reportsList={reportsList} />
    </>
  );
}

function createData(date, quizTitle, quizDescription, handleView) {
  return {
    date,
    quizTitle,
    quizDescription,
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
  { id: "quizTitle", numeric: false, label: "Quiz Title" },
  { id: "quizDescription", numeric: false, label: "QuizDescription" },
  { id: "action", numeric: false, label: "Action" },
];

function GroupMemberReportsList(props) {
  const { reportsList } = props;
  const history = useHistory();

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(reportsList);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = reportsList.map((quiz, index) => {
      const { quizTitle, quizDescription, date, quizId } = quiz;

      const handleView = () => {
        history.push(`${history.location.pathname}/${quizId}`);
      };

      return createData(date, quizTitle, quizDescription, handleView);
    });

    setDataRows(reloadedRows);
  }, [reportsList, history]);

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
      title="Quiz List"
    />
  );
}
