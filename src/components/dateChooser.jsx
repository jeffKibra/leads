import React from "react";
import { Grid, Button, Box } from "@material-ui/core";
import PropTypes from "prop-types";

import DateInput from "./dateInput";
import FormHOC from "../HOCs/formHOC";

function DateChooser(props) {
  const { register, errors, defaultValue } = props;
  return (
    <Grid container justify="center" spacing={2}>
      <Box m={2}>
        <DateInput
          register={register}
          errors={errors}
          defaultValue={defaultValue}
        />
      </Box>
      <Box m={2}>
        <Button type="submit">search date</Button>
      </Box>
    </Grid>
  );
}

DateChooser.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default FormHOC(DateChooser);
