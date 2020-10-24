import React from "react";
import { Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";

import FileUpload from "./fileUpload";
import FormHOC from "../HOCs/formHOC";
import LinearDeterminateProgress from './linearDeterminateProgress'

function FileUploadForm(props) {
  const { register, errors, setValue, fileName, accept } = props;

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs>
        <FileUpload
          register={register}
          errors={errors}
          fileName={fileName}
          setValue={setValue}
          accept={accept}
        />
      </Grid>

      <Grid item xs={12}>
        <Button type="submit">upload</Button>
      </Grid>
      <Grid item xs>
        <LinearDeterminateProgress />
      </Grid>
    </Grid>
  );
}

FileUploadForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
};

export default FormHOC(FileUploadForm);
