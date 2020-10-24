import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import EditProduct from "../components/editProduct";

export default function EditProductPage(props) {
  const params = useParams();
  const { productId } = params;

  const product = useSelector((state) => {
    return state.firestore.data[productId];
  });

  useFirestoreConnect([
    {
      collection: "products",
      doc: productId,
      storeAs: productId,
    },
  ]);

  return <EditProduct data={product} />;
}
