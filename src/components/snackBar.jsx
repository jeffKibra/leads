import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";

const mapStateToSnackBar = (state) => {
  const msg = state.custom.msg;
  return { msg };
};

function SnackBarConstruct(props) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div>
      {" "}
      <button
        style={{ display: "none" }}
        id="snackBarTrigger"
        onClick={handleClick}
      >
        Open simple snackbar
      </button>{" "}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.msg}
      />{" "}
    </div>
  );
}

const SnackBar = connect(mapStateToSnackBar)(SnackBarConstruct);

export default SnackBar;
