import React from "react";
import JournalForm from "./journalForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../general/spinner";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

function CreateJournalComponent(props) {
  const { isOpen, onFormOpen, onFormClose, onFormSubmit, status } = props;
  return (
    <div className="mx-auto">
      {isOpen === true ? (
        <>
          <JournalForm
            journalName=""
            journalDescription=""
            onFormSubmit={onFormSubmit}
            onFormClose={onFormClose}
            btnText="Create"
          />
        </>
      ) : (
        <>
          <Button
            onClick={onFormOpen}
            endIcon={
              status === true ? (
                <Spinner status={status} />
              ) : (
                <FontAwesomeIcon icon="plus" />
              )
            }
          >
            new Journal{" "}
          </Button>
        </>
      )}
    </div>
  );
}

CreateJournalComponent.propTypes = {
  status: PropTypes.bool.isRequired,
  onFormOpen: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default CreateJournalComponent;
