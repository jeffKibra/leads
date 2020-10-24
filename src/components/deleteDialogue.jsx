import React from "react";
import CustomDialogue from "./customDialogue";
import PropTypes from "prop-types";

function DeleteDialogue(props) {
  const onTrashClick = () => {
    props.onTrashClick();
  };

  return (
    <>
      <CustomDialogue
        confirm={onTrashClick}
        title="Delete Action!"
        description="Are you sure you want to continue? This action cannot be undone!"
        render={(handleClickOpen) => {
          return <>{props.render(handleClickOpen)}</>;
        }}
      />
    </>
  );
}

DeleteDialogue.propTypes = {
  onTrashClick: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
};

export default DeleteDialogue;
