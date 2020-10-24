import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import TextInput from "../../components/textInput";
import EmailInput from "../../components/emailInput";
import PasswordInput from "../../components/passwordInput";
import SimpleSelect from "../../components/simpleSelect";
import FileUpload from "../../components/fileUpload";
import FormHOC from "../../HOCs/formHOC";
import LinearDeterminateProgress from "../../components/linearDeterminateProgress";

const useStyles = makeStyles((theme) => {
  return {
    Card: {
      padding: theme.spacing(2),
    },
  };
});

function ExecutivesForm(props) {
  const {
    register,
    errors,
    setValue,
    imageRequired,
    firstName,
    lastName,
    email,
    contact,
    password,
    isBlock,
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
                  required={{ value: true, message: "field cannot be empty" }}
                />
              </Grid>
              <Grid item xs={5} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={lastName}
                  name="lastName"
                  required={{ value: true, message: "field cannot be empty" }}
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
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={contact}
                  name="contact"
                  required={{ value: true, message: "required" }}
                />
              </Grid>
              <Grid item xs={5} container direction="column" justify="center">
                <SimpleSelect
                  register={register}
                  errors={errors}
                  defaultValue={isBlock || ""}
                  name="isBlock"
                  setValue={setValue}
                >
                  <MenuItem value="">
                    <em>is blocked!</em>
                  </MenuItem>
                  <MenuItem value="blocked">blocked</MenuItem>
                  <MenuItem value="not-blocked">not blocked</MenuItem>
                </SimpleSelect>
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <PasswordInput
                  name="password"
                  register={register}
                  errors={errors}
                  defaultValue={password}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <FileUpload
                  fileName="executiveImage"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  imageRequired={imageRequired}
                  accept="image/*"
                />
              </Grid>
              <Grid item xs>
                <Button type="submit" className={classes.button}>
                  save
                </Button>
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

ExecutivesForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  imageRequired: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  contact: PropTypes.string,
  password: PropTypes.string,
  isBlock: PropTypes.string,
};

export default FormHOC(ExecutivesForm);
