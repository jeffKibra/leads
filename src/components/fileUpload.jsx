import React, { useEffect } from "react";
import { Grid, FormHelperText /*Avatar*/ } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    error: {
      color: theme.palette.error.main,
    },
  };
});

export default function FileUpload(props) {
  const { register, errors, setValue, fileName, accept, ...other } = props;

  useEffect(() => {
    register(fileName, { required: { value: true, message: "Required!" } });
  }, [register, fileName]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue(fileName, file);
  };

  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} sm={8}>
        <input
          {...other}
          name={fileName}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          // "image/*"
        />

        {/* <Button component="label">
          upload file
          <input
            ref={register({ required: true })}
            name={fileName}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
        </Button> */}
      </Grid>
      {/* {src && (
        <Grid item xs={12} sm={4} container justify="center">
          <Avatar variant="rounded" alt="image-preview" src={src}>
            image
          </Avatar>
        </Grid>
      )} */}

      <Grid item xs={12}>
        <FormHelperText className={classes.error}>
          {errors[fileName]?.message}
        </FormHelperText>
      </Grid>
    </Grid>
  );
}

FileUpload.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
};
