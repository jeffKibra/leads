import React, { Component } from "react";
import { connect } from "react-redux";
//import * as moment from "moment";
import { uuid } from "uuidv4";
import { setMsg } from "../../modules/basicActions";
import { newJournal } from "../../modules/firestoreActions";
import CreateJournalComponent from "./createJournalComponent";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  const { firestore, custom } = state;
  const status = custom.loading;
  const { journals } = firestore.ordered;
  return { status, journals };
};

const mapDispatchToProps = (dispatch) => ({
  setMsg: (msg) => dispatch(setMsg(msg)),
  newJournal: (data) => dispatch(newJournal(data)),
});

class CreateJournal extends Component {
  state = {
    isOpen: false,
  };

  onFormOpen = () => {
    this.setState({ isOpen: true });
  };

  onFormClose = () => {
    this.setState({ isOpen: false });
  };

  onFormSubmit = (formData) => {
    //const date = moment().format("LL");
    //const time = moment().format("LTS");
    const journalData = {
      journalName: formData.journalName,
      journalDescription: formData.journalDescription,
      journalId: uuid(),
      createdAt: new Date().toISOString(),
      entries: 0,
    };

    this.props.newJournal(journalData, "journals");
    this.onFormClose();
  };

  render() {
    const { isOpen } = this.state;
    const { status } = this.props;
    return (
      <>
        <CreateJournalComponent
          isOpen={isOpen}
          onFormOpen={this.onFormOpen}
          onFormClose={this.onFormClose}
          onFormSubmit={this.onFormSubmit}
          status={status}
        />
      </>
    );
  }
}

CreateJournal.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateJournal);
