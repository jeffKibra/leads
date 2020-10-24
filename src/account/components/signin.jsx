import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import PasswordInput from "../../components/passwordInput";
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

function Signin(props) {
  const { register, errors, goBack } = props;
  const classes = useStyles();
  const { loading, email } = useSelector((state) => state.custom);

  return (
    <>
      {" "}
      <Grid container justify="space-between" spacing={3}>
        <Grid item xs={12} container direction="column" justify="center">
          <EmailInput
            defaultValue={email}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} container direction="column" justify="center">
          <PasswordInput
            label="Password"
            name="password"
            register={register}
            errors={errors}
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
          signin
        </Button>
      </Grid>
      <Grid item xs={12} container justify="center">
        <Link to="/forgotPassword">Forgot Password!</Link>
      </Grid>
    </>
  );
}

Signin.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default FormHOC(Signin);
