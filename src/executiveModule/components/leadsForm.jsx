import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";

import TextInput from "../../components/textInput";
import NumberInput from "../../components/numberInput";
import DateInput from "../../components/dateInput";
import SimpleSelect from "../../components/simpleSelect";
import CustomSkeleton from "../../components/customSkeleton";
import LinearDeterminateProgress from "../../components/linearDeterminateProgress";

const useStyles = makeStyles((theme) => {
  return {
    Card: {
      padding: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(2, 0),
    },
  };
});

export default function LeadssForm(props) {
  const {
    onFormSubmit,
    productId,
    doctorId,
    leads,
    remarks,
    date,
    title,
  } = props;
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: "products",
    },
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

  const data = useSelector((state) => state.firestore.ordered);
  const { products, doctors } = data;
  const objectProducts = useSelector((state) => state.firestore.data.products);
  const objectDoctors = useSelector((state) => state.firestore.data.doctors);

  const { register, errors, setValue, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      product: productId || "",
      doctor: doctorId || "",
      leads: leads,
      remarks: remarks,
      date: date,
    },
  });

  const onSubmit = (data, e) => {
    e.target.reset();
    const selectedProduct = objectProducts[data.product];
    const selectedDoctor = objectDoctors[data.doctor];

    const newData = {
      ...data,
      imageURL: selectedProduct.imageURL || "",
      productName: selectedProduct.productName,
      doctorName: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
    };

    onFormSubmit(newData);
  };

  const classes = useStyles();

  if (!isLoaded(products) || !isLoaded(doctors)) return <CustomSkeleton />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="center">
        <Grid item xs={12} sm={10} md={8} lg={6} container justify="center">
          <Card>
            <CardHeader title={title} />
            <CardContent>
              <Grid container justify="space-between" spacing={3}>
                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  justify="center"
                >
                  <SimpleSelect
                    name="product"
                    label="Select Product"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    defaultValue={productId || ""}
                  >
                    <MenuItem value="">
                      <Typography variant="subtitle1">
                        Select Product
                      </Typography>
                    </MenuItem>
                    {products.map((product, index) => {
                      const { productId, productName } = product;
                      return (
                        <MenuItem key={index} value={productId}>
                          {productName}
                        </MenuItem>
                      );
                    })}
                  </SimpleSelect>
                </Grid>

                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  justify="center"
                >
                  <SimpleSelect
                    name="doctor"
                    label="Select Doctor"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    defaultValue={doctorId || ""}
                  >
                    <MenuItem value="">
                      <Typography variant="subtitle1">Select Doctor</Typography>
                    </MenuItem>
                    {doctors.map((doctor, index) => {
                      const { doctorId, firstName, lastName } = doctor;
                      return (
                        <MenuItem
                          key={index}
                          value={doctorId}
                        >{`${firstName} ${lastName}`}</MenuItem>
                      );
                    })}
                  </SimpleSelect>
                </Grid>

                <Grid item xs={5} container direction="column" justify="center">
                  <DateInput
                    register={register}
                    errors={errors}
                    defaultValue={date}
                  />
                </Grid>
                <Grid item xs={5} container direction="column" justify="center">
                  <NumberInput
                    register={register}
                    errors={errors}
                    defaultValue={leads}
                    name="leads"
                    label="Leads"
                    required={{ value: true, message: "field cannot be empty" }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  justify="center"
                >
                  <TextInput
                    multiline
                    rows={3}
                    register={register}
                    errors={errors}
                    defaultValue={remarks}
                    name="remarks"
                    label="Remarks"
                    required={{ value: true, message: "required" }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" className={classes.button}>
                save
              </Button>
              <LinearDeterminateProgress />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}

LeadssForm.propTypes = {
  // register: PropTypes.func.isRequired,
  // errors: PropTypes.object.isRequired,
  // setValue: PropTypes.func.isRequired,
  productId: PropTypes.string,
  doctorId: PropTypes.string,
  date: PropTypes.string,
  leads: PropTypes.string,
  remarks: PropTypes.string,
  onFormSubmit: PropTypes.func.isRequired,
};
