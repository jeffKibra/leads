import React from "react";
import { useDispatch } from "react-redux";

import ProductsForm from "./productsForm";
import { uploadFile, updateData } from "../../modules/firestoreActions";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";

function EditProduct(props) {
  const dispatch = useDispatch();
  const { loadedData } = props;
  // console.log(loadedData);
  //   const product = loadedData[productId];
  const {
    productName,
    productDescription,
    productCategory,
    productId,
  } = loadedData;

  const onFormSubmit = (data) => {
    //data.productImage.name
    let productData = {
      ...loadedData,
      productName: data.productName,
      productDescription: data.productDescription,
      productCategory: data.productCategory,
    };

    const path = `productImages/${productData.productId}`;
    const collection = "products";

    const cb = (imageURL) => {
      const dataObj = {
        ...productData,
        imageURL,
      };

      dispatch(updateData(collection, productData.productId, dataObj));
    };

    if (data.productImage) {
      dispatch(uploadFile(path, data.productImage, cb));
    } else {
      dispatch(updateData(collection, productData.productId, productData));
    }
  };

  return (
    <>
      {productId && (
        <ProductsForm
          defaultValues={{
            productName,
            productDescription,
            productCategory,
          }}
          productName={productName}
          productDescription={productDescription}
          productCategory={productCategory}
          onFormSubmit={onFormSubmit}
          imageRequired={false}
        />
      )}
    </>
  );
}

export default IsLoadedIsEmptyHOC(EditProduct);
