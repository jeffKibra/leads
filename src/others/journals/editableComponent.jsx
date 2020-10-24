import React from "react";
import JournalDisplay from "./journalDisplay";
import UpdateJournal from "./updateJournal";

function EditableComponent(props) {
  const { journal, editFormOpen } = props;
  const onEditClick = () => {
    props.openForm();
  };

  const onFormClose = () => {
    props.closeForm();
  };

  const onTrashClick = () => {
    props.onJournalDelete(journal.journalid);
  };

  if (editFormOpen) {
    return (
      <div className="mx-auto">
        <UpdateJournal journal={journal} onFormClose={onFormClose} />
      </div>
    );
  } else {
    return (
      <JournalDisplay
        journal={journal}
        onEditClick={onEditClick}
        onTrashClick={onTrashClick}
      />
    );
  }
}

export default EditableComponent;
