import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";

import EmailInput from "../../components/emailInput";
import FormHOC from "../../HOCs/formHOC";

const useStyles = makeStyles((theme) => {
  return {
    button: {
      margin: theme.spacing(2, 0),
    },
  };
});

function ForgotPassword(props) {
  const { register, errors } = props;
  const classes = useStyles();

  return (
    <>
      {" "}
      <Grid container justify="space-between" spacing={3}>
        <Grid item xs={12} container direction="column" justify="center">
          <EmailInput register={register} errors={errors} />
        </Grid>
      </Grid>
      <Button type="submit" className={classes.button}>
        submit
      </Button>
    </>
  );
}

ForgotPassword.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default FormHOC(ForgotPassword);
