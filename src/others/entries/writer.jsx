import React from "react";
import TinymceEditor from "./tinymceEditor";
import PropTypes from "prop-types";

function Writer(props) {
  //console.log(props);
  const { entry, newEntry, status, journalId, editorId } = props;

  const onFormSubmit = async (content) => {
    //console.log(content);
    newEntry(content);
  };

  return (
    <>
      <TinymceEditor
        journalId={journalId}
        editorId={editorId}
        status={status}
        entry={entry}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
}

Writer.propTypes = {
  entry: PropTypes.string.isRequired,
  newEntry: PropTypes.func.isRequired,
  editorId: PropTypes.string.isRequired,
  journalId: PropTypes.string.isRequired,
};

export default Writer;
