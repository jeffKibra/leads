import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Editor } from "@tinymce/tinymce-react";

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

export default function TinymceEditor(props) {
  const classes = useStyles();
  // console.log(props);
  const {
    name,
    defaultValue,
    register,
    errors,
    setValue,
    watch,
    editorId,
  } = props;

  const [isRegisterd, setIsRegistered] = useState(false);

  useEffect(() => {
    register(name, {
      required: { value: true, message: "Required!" },
    });
    setIsRegistered(true);
  }, [register, name]);

  useEffect(() => {
    if (isRegisterd) {
      setValue(name, defaultValue);
    }
  }, [name, defaultValue, setValue, isRegisterd]);

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
    height: "400",
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
      <div className={classes.root}>
        <Editor
          id={editorId}
          init={{
            ...init,
          }}
          // initialValue={value}
          value={editorValue}
          onEditorChange={onEntryChange}
        />

        <Typography
          className={classes.errorText}
          variant="caption"
          color="error"
        >
          {errors.entry?.message}
        </Typography>
      </div>
    </>
  );
}

TinymceEditor.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.node,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  editorId: PropTypes.string,
};
