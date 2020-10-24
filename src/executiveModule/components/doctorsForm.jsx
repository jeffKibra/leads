import React from "react";
import { Card, CardHeader, CardContent, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TextInput from "../../components/textInput";
import NumberInput from "../../components/numberInput";
import EmailInput from "../../components/emailInput";
import FormHOC from "../../HOCs/formHOC";

const useStyles = makeStyles((theme) => {
  return {
    Card: {
      padding: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
    },
  };
});

function ExecutivesForm(props) {
  const {
    register,
    errors,
    firstName,
    lastName,
    email,
    mobile1,
    mobile2,
    landline,
    address,
    designation,
    clinicName,
    location,
    level,
    other1,
    other2,
    other3,
  } = props;
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={8} container justify="center">
        <Card>
          <CardHeader title="Executives" />
          <CardContent>
            <Grid container justify="space-between" spacing={3}>
              <Grid item xs={5} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={firstName}
                  name="firstName"
                  label="First Name"
                  required={{ value: true, message: "required" }}
                />
              </Grid>
              <Grid item xs={5} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={lastName}
                  name="lastName"
                  label="Last Name"
                  required={{ value: true, message: "required" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <EmailInput
                  register={register}
                  errors={errors}
                  defaultValue={email}
                />
              </Grid>
              <Grid item xs={5} container direction="column" justify="center">
                <NumberInput
                  register={register}
                  errors={errors}
                  defaultValue={mobile1}
                  name="mobile1"
                  label="Mobile 1"
                  required={{ value: true, message: "required" }}
                />
              </Grid>
              <Grid item xs={5} container direction="column" justify="center">
                <NumberInput
                  register={register}
                  errors={errors}
                  defaultValue={mobile2}
                  name="mobile2"
                  label="Mobile 2"
                  required={{ value: false, message: "optional" }}
                />
              </Grid>
              <Grid item xs={5} container direction="column" justify="center">
                <NumberInput
                  register={register}
                  errors={errors}
                  defaultValue={landline}
                  name="landline"
                  label="Landline"
                  required={{ value: false, message: "optional" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={address}
                  name="address"
                  label="Address"
                  required={{ value: true, message: "required" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={designation}
                  name="designation"
                  label="Designation"
                  required={{ value: true, message: "required" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={clinicName}
                  name="clinicName"
                  label="Clinic Name"
                  required={{ value: true, message: "required" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={location}
                  name="location"
                  label="Location"
                  required={{ value: true, message: "required" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={level}
                  name="level"
                  label="Level of Doctor"
                  required={{ value: true, message: "required" }}
                />
              </Grid>
              <Grid item xs={5} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={other1}
                  name="other1"
                  label="Other 1"
                  required={{ value: false, message: "optional" }}
                />
              </Grid>
              <Grid item xs={5} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={other2}
                  name="other2"
                  label="Other 2"
                  required={{ value: false, message: "optional" }}
                />
              </Grid>
              <Grid item xs={5} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={other3}
                  name="other3"
                  label="Other 3"
                  required={{ value: false, message: "optional" }}
                />
              </Grid>
            </Grid>
            <Button type="submit" className={classes.button}>
              save
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default FormHOC(ExecutivesForm);
