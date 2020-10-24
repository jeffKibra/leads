import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import CustomTable from "../../components/customTable";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";
import Actions from "../../components/actions";
import { deleteData } from "../../modules/firestoreActions";

function createData(
  date,
  productName,
  productDescription,
  productCategory,
  imageURL,
  id,
  handleDelete
) {
  return {
    date,
    productName,
    productDescription,
    productCategory,
    productImage: (
      <Avatar variant="rounded" alt="product image" src={imageURL} />
    ),
    action: (
      <Actions
        handleDelete={() => handleDelete(id)}
        editRoute={`editProduct/${id}`}
        id={id}
      />
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
  { id: "productName", numeric: false, label: "ProductName" },
  { id: "productDescription", numeric: false, label: "ProductDesc" },
  { id: "productCategory", numeric: false, label: "ProductCategory" },
  { id: "productImage", numeric: false, label: "ProductImage" },
  { id: "action", numeric: false, label: "Action" },
];

function ProductsListComponent(props) {
  const dispatch = useDispatch();
  const { loadedData } = props;

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(loadedData);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const handleDelete = (id) => {
      dispatch(deleteData("products", id));
    };

    const reloadedRows = loadedData.map((product, index) => {
      const {
        productName,
        productDescription,
        productCategory,
        imageURL,
        productId,
        date,
      } = product;
      return createData(
        date,
        productName,
        productDescription,
        productCategory,
        imageURL,
        productId,
        handleDelete
      );
    });

    setDataRows(reloadedRows);
  }, [loadedData, dispatch]);

  const handleSearch = (value) => {
    const newData = dataRows.filter(
      (row) => row.productName.toUpperCase().indexOf(value) > -1
    );

    setRows(newData);
  };

  return (
    <CustomTable
      handleSearch={handleSearch}
      rows={rows}
      headCells={headCells}
      title="Products"
    />
  );
}

export default IsLoadedIsEmptyHOC(ProductsListComponent);
