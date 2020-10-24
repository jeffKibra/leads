import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkKey } from "../../modules/basicActions";
import PinLogin from "../security/pinLogin";
import db from "../../utils/dbaccess";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
});

const PinProtected = (props) => {
  useEffect(() => {
    db.pin.count().then((value) => {
      if (value === 0) {
        props.checkKey({ storageKey: false });
      } else {
        props.checkKey({ storageKey: true });
      }
    });
  });

  return (
    <>
      {props.custom.storageKey ? (
        props.custom.securityKey ? (
          props.children
        ) : (
          <PinLogin />
        )
      ) : (
        props.children
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PinProtected);
