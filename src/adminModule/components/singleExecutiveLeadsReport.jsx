import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomTable from "../../components/customTable";
//import Actions from "../../components/actions";
//import { deleteData } from "../../modules/firestoreActions";

function createData(date, product, doctor, leads, imageURL, id, handleDelete) {
  return {
    date,
    product,
    productImage: (
      <Avatar variant="rounded" alt="product image" src={imageURL} />
    ),
    doctor,
    leads,
    // action: (
    //   <Actions
    //     handleDelete={() => handleDelete(id)}
    //     editRoute={`editlead/${id}`}
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
  { id: "product", numeric: false, label: "Product" },
  { id: "productImage", numeric: false, label: "Product Image" },
  { id: "doctor", label: "Doctor" },
  { id: "leads", numeric: false, label: "Leads" },
  //{ id: "action", numeric: false, label: "Action" },
];

export default function SingleExecutiveLeadsReport(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);
  const { leads, title } = props;

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(leads);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    // const handleDelete = (id) => {
    //   dispatch(deleteData(`executives/${auth.uid}/leads`, id));
    // };

    const reloadedRows = leads.map((lead, index) => {
      const { productName, doctorName, leads, imageURL, leadId, date } = lead;
      return createData(
        date,
        productName,
        doctorName,
        leads,
        imageURL,
        leadId
        // handleDelete
      );
    });

    setDataRows(reloadedRows);
  }, [leads, dispatch, auth.uid]);

  const handleSearch = (value) => {
    const newData = dataRows.filter(
      (row) => row.product.toUpperCase().indexOf(value) > -1
    );

    setRows(newData);
  };

  return (
    <CustomTable
      handleSearch={handleSearch}
      rows={rows}
      headCells={headCells}
      title={title}
    />
  );
}

