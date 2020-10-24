import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Avatar } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { Empty } from "antd";
import { Grid } from "@material-ui/core";

import CustomTable from "../../components/customTable";
import ActionView from "../../components/actionView";
import CustomSkeleton from "../../components/customSkeleton";

export default function DoctorQuizReportPage() {
  const auth = useSelector((state) => state.firebase.auth);
  const params = useParams();
  const { doctorId, quizId } = params;
  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "doctors",
          doc: doctorId,
          subcollections: [
            {
              collection: "reports",
              doc: quizId,
            },
          ],
        },
      ],
      storeAs: "quizReport",
    },
  ]);

  const quizReport = useSelector((state) => state.firestore.ordered.quizReport);

  if (!isLoaded(quizReport)) return <CustomSkeleton />;

  if (isEmpty(quizReport))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );

  return (
    <>
      <DoctorQuizReport quizReport={quizReport} />
    </>
  );
}

function createData(date, name, email, imageURL, handleView) {
  return {
    date,
    name,
    email,
    image: <Avatar variant="rounded" alt="executive image" src={imageURL} />,
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
  { id: "image", numeric: false, label: "Image" },
  { id: "action", numeric: false, label: "Action" },
];

function DoctorQuizReport(props) {
  const { executives } = props;
  const history = useHistory();

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(executives);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = executives.map((executive, index) => {
      const {
        firstName,
        lastName,
        email,
        date,
        imageURL,
        executiveId,
      } = executive;

      const handleView = () => {
        history.push(`${history.location.pathname}/${executiveId}`);
      };

      return createData(
        date,
        `${firstName} ${lastName}`,
        email,
        imageURL,
        executiveId,
        handleView
      );
    });

    setDataRows(reloadedRows);
  }, [executives, history]);

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
      title="Quiz Report"
    />
  );
}
