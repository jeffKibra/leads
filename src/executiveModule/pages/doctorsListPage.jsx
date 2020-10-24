import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Empty } from "antd";

import CustomTable from "../../components/customTable";
import ActionEdit from "../../components/actionEdit";
import ActionDelete from "../../components/actionDelete";
import ActionShare from "../../components/actionShare";
import { deleteData } from "../../modules/firestoreActions";
import CustomSkeleton from "../../components/customSkeleton";

export default function DoctorsListPage() {
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "doctors",
          storeAs: "doctors",
        },
      ],
      storeAs: "doctors",
    },
  ]);

  const doctors = useSelector((state) => state.firestore.ordered.doctors);

  if (!isLoaded(doctors)) return <CustomSkeleton />;
  if (isEmpty(doctors))
    return (
      <Grid>
        <Empty description="No Doctors" />
      </Grid>
    );

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Button
          component={Link}
          to="/addDoctor"
          endIcon={<FontAwesomeIcon icon="plus" />}
        >
          add
        </Button>
      </Grid>
      <DoctorsList doctors={doctors} />
    </>
  );
}

function createData(
  date,
  name,
  email,
  mobile,
  executiveId,
  handleDelete,
  handleEdit
) {
  return {
    date,
    name,
    email,
    mobile,
    action: (
      <Grid container justify="space-around">
        <ActionShare
          text={`https://playquizleads.web.app/playQuiz/singleQuiz/${executiveId}`}
          email={email}
        />
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
  { id: "name", numeric: false, label: "Name" },
  { id: "email", numeric: false, label: "Email" },
  { id: "mobile", numeric: false, label: "Mobile" },
  { id: "action", numeric: false, label: "Action" },
];

function DoctorsList(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector((state) => state.firebase.auth);
  const { doctors } = props;

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(doctors);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = doctors.map((doctor, index) => {
      const { firstName, lastName, email, mobile1, date, doctorId } = doctor;

      const handleDelete = () => {
        dispatch(deleteData(`executives/${auth.uid}/doctors`, doctorId));
      };

      const handleEdit = () => {
        history.push(`/editdoctor/${doctorId}`);
      };

      return createData(
        date,
        `${firstName} ${lastName}`,
        email,
        mobile1,
        auth.uid,
        handleDelete,
        handleEdit
      );
    });

    setDataRows(reloadedRows);
  }, [doctors, dispatch, auth.uid, history]);

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
      title="Doctors"
    />
  );
}
