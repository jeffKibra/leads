import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory, useParams } from "react-router-dom";
import { Empty } from "antd";
import { Grid } from "@material-ui/core";

import CustomTable from "../../components/customTable";
import ActionView from "../../components/actionView";
import CustomSkeleton from "../../components/customSkeleton";

export default function DoctorQuizListPage() {
  const params = useParams();
  const { executiveId, doctorId } = params;
  useFirestoreConnect([
    {
      collection: "executives",
      doc: executiveId,
      subcollections: [
        {
          collection: "doctors",
          doc: doctorId,
          subcollections: [
            {
              collection: "reports",
            },
          ],
        },
      ],
      storeAs: "reports",
    },
  ]);

  const reports = useSelector((state) => state.firestore.ordered.reports);

  if (!isLoaded(reports)) return <CustomSkeleton />;

  if (isEmpty(reports))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );

  return (
    <>
      <DoctorQuizList reports={reports} />
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
  { id: "quizDescription", numeric: false, label: "Quiz Description" },
  { id: "action", numeric: false, label: "Action" },
];

function DoctorQuizList(props) {
  const { reports } = props;
  const history = useHistory();

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(reports);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = reports.map((quiz, index) => {
      const { quizTitle, quizDescription, date, quizId } = quiz;

      const handleView = () => {
        history.push(`${history.location.pathname}/${quizId}`);
      };

      return createData(date, quizTitle, quizDescription, quizId, handleView);
    });

    setDataRows(reloadedRows);
  }, [reports, history]);

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
      title="Doctor Quiz Reports"
    />
  );
}
