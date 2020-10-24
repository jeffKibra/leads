import React from "react";
import { Card, CardHeader, CardContent, Button, Grid } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import TextInput from "../../components/textInput";
import FileUpload from "../../components/fileUpload";
import LinearDeterminateProgress from "../../components/linearDeterminateProgress";
import FormHOC from "../../HOCs/formHOC";

// const useStyles = makeStyles((theme) => {
//   return {
//     Card: {
//       padding: theme.spacing(2),
//     },
//     button: {
//       margin: theme.spacing(2, 0),
//     },
//   };
// });

function ProductsForm(props) {
  const {
    register,
    errors,
    setValue,
    productName,
    productCategory,
    productDescription,
    imageRequired,
  } = props;

  //const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={8} lg={6} container justify="center">
        <Card>
          <CardHeader title="Products" />
          <CardContent>
            <Grid container justify="space-between" spacing={3}>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={productName}
                  name="productName"
                  required={{ value: true, message: "field cannot be empty" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={productCategory}
                  name="productCategory"
                  required={{ value: true, message: "field cannot be empty" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  multiline
                  rows={4}
                  register={register}
                  errors={errors}
                  defaultValue={productDescription}
                  name="productDescription"
                  required={{ value: true, message: "required" }}
                />
              </Grid>

              <Grid item xs={12} container direction="column" justify="center">
                <FileUpload
                  fileName="productImage"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  imageRequired={imageRequired}
                  accept="image/*"
                />
              </Grid>
              <Grid item xs>
                <Button type="submit">save</Button>
              </Grid>
              <Grid item xs>
                <LinearDeterminateProgress />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

ProductsForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  productName: PropTypes.string,
  productDescription: PropTypes.string,
  productCategory: PropTypes.string,
  imageRequired: PropTypes.bool,
  onFormSubmit: PropTypes.func.isRequired,
};

export default FormHOC(ProductsForm);
