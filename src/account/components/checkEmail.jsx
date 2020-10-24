import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

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

function CheckEmail(props) {
  const { register, errors } = props;
  const classes = useStyles();
  const loading = useSelector((state) => state.custom.loading);
  const email = useSelector((state) => state.custom.email);

  return (
    <div>
      <Grid container justify="space-between" spacing={3}>
        <Grid item xs={12} container direction="column" justify="center">
          <EmailInput
            defaultValue={email}
            register={register}
            errors={errors}
          />
        </Grid>
      </Grid>{" "}
      <Grid container justify="flex-end">
        <Button
          type="submit"
          className={classes.button}
          endIcon={<Spinner loading={loading} />}
        >
          next
        </Button>
      </Grid>
    </div>
  );
}

CheckEmail.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default FormHOC(CheckEmail);
