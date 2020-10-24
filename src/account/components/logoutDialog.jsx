import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { logoutAsync } from "../../modules/authActions";
import CustomDialogue from "../../components/customDialogue";

function LogoutDialog(props) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAsync());
  };

  return (
    <>
      <CustomDialogue
        confirm={logout}
        title="Ready to leave?"
        description="Are you sure you want to logout?"
        render={(handleClickOpen) => {
          return <>{props.render(handleClickOpen)}</>;
        }}
      />
    </>
  );
}

LogoutDialog.propTypes = {
  render: PropTypes.func.isRequired,
};

export default LogoutDialog;
