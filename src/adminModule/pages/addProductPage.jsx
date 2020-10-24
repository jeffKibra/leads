import React from "react";
import { uuid } from "uuidv4";
import { useDispatch } from "react-redux";

import ProductsForm from "../components/productsForm";
import { addData, uploadFile } from "../../modules/firestoreActions";

export default function AddProductPage(props) {
  const dispatch = useDispatch();

  const onFormSubmit = (data) => {
    const productId = uuid();
    //data.productImage.name
    let productData = {
      productName: data.productName,
      productDescription: data.productDescription,
      productCategory: data.productCategory,
      productId,
      date: new Date().toISOString().substr(0, 10),
    };

    const path = `productImages/${productData.productId}`;
    const collection = "products";

    const cb = (imageURL) => {
      const dataObj = {
        ...productData,
        imageURL,
      };

      dispatch(addData(collection, productData.productId, dataObj));
    };

    if (data.productImage) {
      dispatch(uploadFile(path, data.productImage, cb));
    } else {
      dispatch(addData(collection, productData.productId, productData));
    }
  };

  return (
    <>
      <ProductsForm onFormSubmit={onFormSubmit} />
    </>
  );
}
