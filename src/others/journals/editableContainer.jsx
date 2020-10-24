import React, { Component } from "react";
import EditableComponent from "./editableComponent";
//import $ from "jquery";
import { connect } from "react-redux";
import { setMsg } from "../../modules/basicActions";

const mapDispatchToProps = (dispatch) => ({
  setMsg: (msg) => dispatch(setMsg(msg)),
});

class EditableContainer extends Component {
  state = {
    editFormOpen: false,
    status: false,
  };

  onJournalDelete = (id) => {
    console.log(id);
    /*this.setState({ status: true });
    Fetcher({ journalid: id, submit: "DELETEJOURNAL" }, "DELETE")
      .then((val) => {
        if (!val.value) throw new Error("false value");
        this.setState({ status: false });
        this.props.setMsg({ msg: "deleted" });
        $("#snackBarTrigger").trigger("click");
        //console.log(val);
        this.props.refreshJournal();
      })
      .catch((err) => {
        this.setState({ status: false });
        this.props.setMsg({ msg: "deletion failed" });
        $("#snackBarTrigger").trigger("click");
        this.props.refreshJournal();
        //console.log(err);
      });*/
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    return (
      <>
        <EditableComponent
          refreshJournal={this.props.refreshJournal}
          onJournalDelete={this.onJournalDelete}
          closeForm={this.closeForm}
          openForm={this.openForm}
          editFormOpen={this.state.editFormOpen}
          journal={this.props.journal}
        />
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(EditableContainer);
