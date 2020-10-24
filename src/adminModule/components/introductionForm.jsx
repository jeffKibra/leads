import React from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";

import FormHOC from "../../HOCs/formHOC";
import TinymceEditor from "../../components/tinymceEditor";

function IntroductionForm(props) {
  const { register, errors, setValue, watch, introduction } = props;
  return (
    <>
      <Grid container justify="center" alignContent="center" spacing={3}>
        <Grid item xs={12}>
          <TinymceEditor
            name="introduction"
            defaultValue={introduction || ""}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        </Grid>
        <Grid item xs>
          <Button type="submit">Save</Button>
        </Grid>
      </Grid>
    </>
  );
}

IntroductionForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  introduction: PropTypes.any,
};

export default FormHOC(IntroductionForm);
