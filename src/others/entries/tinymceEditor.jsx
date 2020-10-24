import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Editor } from "@tinymce/tinymce-react";

import TinyComponent from "./tinyComponent";
import FormHOC from "../HOCs/formHOC";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: theme.spacing(2, 0),
    },
    errorText: {
      padding: theme.spacing(1, 0),
    },
  };
});

function TinymceEditor(props) {
  const classes = useStyles();
  //console.log(props);
  const {
    name,
    defaultValue,
    register,
    errors,
    setValue,
    watch,
    editorId,
  } = props;

  useEffect(() => {
    register(name, {
      required: { value: true, message: "Required!" },
    });
  }, [register, name]);

  useEffect(() => {
    setValue(name, defaultValue);
  }, [name, defaultValue, setValue]);

  const editorValue = watch(name);
  console.log(editorValue);

  const onEntryChange = (content) => {
    setValue(name, content);
  };

  const plugins = [
    "advlist autolink lists link image charmap print preview hr",
    "pagebreak spellchecker nonbreaking anchor",
    "table emoticons template wordcount",
    "searchreplace visualblocks visualchars fullscreen",
    "insertdatetime media paste code help autosave",
  ];
  const toolbar =
    "undo redo | restoredraft insertdatetime | formatselect | bold italic forecolor backcolor | hr pagebreak nonbreaking table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | emoticons charmap removeformat | searchreplace fullscreen preview print | help";

  const init = {
    height: "500",
    placeholder: "type here...",
    plugins: plugins,
    menu: {
      favs: {
        title: "myFavorite",
        items: "emoticons spellchecker",
      },
    },
    toolbar: toolbar,
    menubar: "fav file edit view insert format",
    autosave_interval: "10s",
    autosave_retention: "86400m",
    //content_css: "tinymce/skins/content/writer/content.css",
    autosave_restore_when_empty: true,
    mobile: {
      menubar: true,
      theme: "mobile",
    },
  };

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
              value={editorValue}
              onEditorChange={onEntryChange}
            />

            <Typography variant="caption" color="error">
              {errors.entry?.message}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <TinyComponent
        value={editorValue}
        editorId={editorId}
        errors={errors}
        onEntryChange={onEntryChange}
        init={init}
      />
    </>
  );
}

TinymceEditor.propTypes = {
  subject: PropTypes.string.isRequired,
  entry: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  journalId: PropTypes.string.isRequired,
  editorId: PropTypes.string.isRequired,
};

export default FormHOC(TinymceEditor);
