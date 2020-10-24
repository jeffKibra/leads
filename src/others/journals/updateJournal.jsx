import React, { Component } from "react";
import JournalForm from "./journalForm";
import { connect } from "react-redux";
import { setMsg } from "../../modules/basicActions";
import { updateJournal } from "../../modules/firestoreActions";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  setMsg: (msg) => dispatch(setMsg(msg)),
  updateJournal: (data) => dispatch(updateJournal(data)),
});

class UpdateJournal extends Component {
  onJournalUpdate = (formData) => {
    const updateData = {
      ...this.props.journal,
      journalName: formData.journalName,
      journalDescription: formData.journalDescription,
    };
    //console.log(formData);

    this.props.updateJournal(updateData, "journals");
    this.props.onFormClose();
    //console.log(updateData);
  };

  render() {
    const { journalName, journalDescription } = this.props.journal;
    return (
      <JournalForm
        journalName={journalName}
        journalDescription={journalDescription}
        onFormSubmit={this.onJournalUpdate}
        onFormClose={this.props.onFormClose}
        btnText="Update"
      />
    );
  }
}

UpdateJournal.propTypes = {
  updateJournal: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
  journal: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateJournal);
