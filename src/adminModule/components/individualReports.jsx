import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomTable from "../../components/customTable";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";
// import Actions from "../../components/actions";
// import { deleteData } from "../../modules/firestoreActions";

function createData(date, name, email, mobile, clinicName, id, handleDelete) {
  return {
    date,
    name,
    email,
    mobile,
    clinicName,
    // action: (
    //   <Actions
    //     email={email}
    //     handleDelete={() => handleDelete(id)}
    //     editRoute={`/editdoctor/${id}`}
    //     id={id}
    //   />
    // ),
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
  { id: "clinicName", numeric: false, label: "Clinic Name" },
  { id: "action", numeric: false, label: "Action" },
];

function DoctorsList(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);
  const { loadedData } = props;

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(loadedData);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    // const handleDelete = (id) => {
    //   dispatch(deleteData(`executives/${auth.uid}/doctors`, id));
    // };

    const reloadedRows = loadedData.map((doctor, index) => {
      const {
        firstName,
        lastName,
        email,
        mobile1,
        date,
        doctorId,
        clinicName,
      } = doctor;
      return createData(
        date,
        `${firstName} ${lastName}`,
        email,
        mobile1,
        clinicName,
        doctorId
        //handleDelete
      );
    });

    setDataRows(reloadedRows);
  }, [loadedData, dispatch, auth.uid]);

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

export default IsLoadedIsEmptyHOC(DoctorsList);
