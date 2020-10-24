import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import TextInput from "../../components/textInput";
import PasswordInput from "../../components/passwordInput";
import PasswordConfirmInput from "../../components/passwordConfirmInput";
import EmailInput from "../../components/emailInput";
import FormHOC from "../../HOCs/formHOC";
import Spinner from "../../components/spinner";

const useStyles = makeStyles((theme) => {
  return {
    button: {
      margin: theme.spacing(2, 0),
    },
  };
});

function CreateAccount(props) {
  const { register, errors, watch, goBack } = props;
  const classes = useStyles();
  const { loading, email } = useSelector((state) => state.custom);
  console.log({ loading, email });

  return (
    <>
      <Grid container justify="space-between" spacing={3}>
        <Grid item xs={12} container direction="column" justify="center">
          <EmailInput
            defaultValue={email}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} container direction="column" justify="center">
          <TextInput
            register={register}
            errors={errors}
            name="firstName"
            label="First Name"
            required={{ value: true, message: "field cannot be empty" }}
          />
        </Grid>
        <Grid item xs={12} container direction="column" justify="center">
          <TextInput
            register={register}
            errors={errors}
            name="lastName"
            label="Last Name"
            required={{ value: true, message: "field cannot be empty" }}
          />
        </Grid>

        <Grid item xs={12} container direction="column" justify="center">
          <PasswordInput
            name="password"
            label="Password"
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} container direction="column" justify="center">
          <PasswordConfirmInput
            name="confirmPassword"
            label="Confirm Password"
            register={register}
            errors={errors}
            watch={watch}
          />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Button onClick={goBack} type="button" className={classes.button}>
          back
        </Button>

        <Button
          type="submit"
          className={classes.button}
          endIcon={<Spinner loading={loading} />}
        >
          create account
        </Button>
      </Grid>

      {/* <Grid container justify="center">
        <Link to="/signin">Sign in</Link>
      </Grid> */}
    </>
  );
}

CreateAccount.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default FormHOC(CreateAccount);
