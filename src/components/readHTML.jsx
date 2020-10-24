import React from "react";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";

export default function ReadHTML(props) {
  const { html } = props;

  const createMarkup = () => ({ __html: sanitizeHtml(html) });
  const myComponent = () => {
    return <div dangerouslySetInnerHTML={createMarkup()}></div>;
  };

  return myComponent();
}

ReadHTML.propTypes = {
  html: PropTypes.node.isRequired,
};
