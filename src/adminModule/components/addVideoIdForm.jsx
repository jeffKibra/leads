import React from "react";
import { Grid, Button, Card, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";

import FormHOC from "../../HOCs/formHOC";
import TextInput from "../../components/textInput";

function AddVideoIdForm(props) {
  const { register, errors } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  name="videoId"
                  required={{ value: true, message: "Required!" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit">save</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

AddVideoIdForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default FormHOC(AddVideoIdForm);
