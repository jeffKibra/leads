import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Typography, Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import { useStyles } from "../../utils/theme";

function TinymceEditor(props) {
  //console.log(props);
  const classes = useStyles();
  const { value, errors, onEntryChange, init, editorId } = props;

  return (
    <>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <div className={classes.margin}>
            <Editor
              id={editorId}
              init={{
                ...init,
              }}
              // initialValue={value}
              value={value}
              onEditorChange={onEntryChange}
            />

            <Typography variant="caption" color="error">
              {errors.entry?.message}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

TinymceEditor.propTypes = {
  subject: PropTypes.string.isRequired,
  entry: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  journalId: PropTypes.string.isRequired,
  editorId: PropTypes.string.isRequired,
};

export default TinymceEditor;
