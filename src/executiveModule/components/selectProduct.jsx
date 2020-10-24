import { MenuItem, Typography, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import SimpleSelect from "../../components/simpleSelect";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";

export default function SelectProduct(props) {
  const { register, errors, setValue, productId } = props;

  const products = useSelector((state) => state.firestore.ordered.products);

  useFirestoreConnect([
    {
      collection: "products",
    },
  ]);

  return (
    <SelectComponent
      register={register}
      errors={errors}
      setValue={setValue}
      data={products}
      productId={productId}
    />
  );
}

const SelectComponent = IsLoadedIsEmptyHOC((props) => {
  const { loadedData, register, errors, setValue, productId } = props;

  return (
    <Grid item xs={12} container direction="column" justify="center">
      <SimpleSelect
        name="product"
        label="Select Product"
        register={register}
        errors={errors}
        setValue={setValue}
        defaultValue={productId || ""}
      >
        <MenuItem value="">
          <Typography variant="subtitle1">Select Product</Typography>{" "}
        </MenuItem>
        {loadedData.map((product) => {
          const { productId, productName } = product;
          return (
            <MenuItem key={productId} value={productId}>
              {productName}
            </MenuItem>
          );
        })}
      </SimpleSelect>
    </Grid>
  );
});
