import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Avatar } from "@material-ui/core";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Empty } from "antd";

import CustomTable from "../../components/customTable";
import CustomSkeleton from "../../components/customSkeleton";

export default function ProductsListPage() {
  useFirestoreConnect([
    {
      collection: "products",
    },
  ]);

  const products = useSelector((state) => state.firestore.ordered.products);

  if (!isLoaded(products)) return <CustomSkeleton />;
  if (isEmpty(products))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );
  return (
    <>
      <ProductsList data={products} />
    </>
  );
}

function createData(
  date,
  productName,
  productDescription,
  productCategory,
  imageURL
) {
  return {
    date,
    productName,
    productDescription,
    productCategory,
    productImage: (
      <Avatar variant="rounded" alt="product image" src={imageURL} />
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
];

function ProductsList(props) {
  const dispatch = useDispatch();
  const { products } = props;

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(products);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = products.map((product, index) => {
      const {
        productName,
        productDescription,
        productCategory,
        imageURL,
        date,
      } = product;

      return createData(
        date,
        productName,
        productDescription,
        productCategory,
        imageURL
      );
    });

    setDataRows(reloadedRows);
  }, [products, dispatch]);

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
