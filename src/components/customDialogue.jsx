import React from "react";
import CustomDialogueComponent from "./customDialogueComponent";
import PropTypes from "prop-types";

export default function CustomDialogue(props) {
  const [open, setOpen] = React.useState(false);
  const { description, title } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirm = () => {
    handleClose();
    props.confirm();
  };
  //console.log(props);
  return (
    <>
      <CustomDialogueComponent
        open={open}
        confirm={confirm}
        handleClose={handleClose}
        description={description}
        title={title}
      >
        {props.render(handleClickOpen)}
      </CustomDialogueComponent>
    </>
  );
}

CustomDialogue.propTypes = {
  confirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
