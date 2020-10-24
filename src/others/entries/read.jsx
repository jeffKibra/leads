import React from "react";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import * as moment from "moment";

import ReadComponent from "./readComponent";

function Read(props) {
  console.log(props);
  const { loading } = props;
  const { entry, createdAt } = props.entry;

  const createMarkup = () => ({ __html: sanitizeHtml(entry) });
  const myComponent = () => {
    return <div dangerouslySetInnerHTML={createMarkup()}></div>;
  };

  const date = moment(createdAt).format("LL");
  const time = moment(createdAt).format("LTS");

  //const { subject, entry, journalId } = props.entry;

  return (
    <ReadComponent
      loading={loading}
      date={date}
      time={time}
      myComponent={myComponent}
    />
  );
}

Read.propTypes = {
  entry: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Read;
