import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import $ from "jquery";

import { setMsg } from "../modules/basicActions";

export default function Copy(props) {
  const dispatch = useDispatch();

  const { children, text } = props;
  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        dispatch(setMsg("copied to clipboard"));
        $("#snackBarTrigger").trigger("click");
      }}
    >
      {children}
    </CopyToClipboard>
  );
}

Copy.propTypes = {
  text: PropTypes.string.isRequired,
};
