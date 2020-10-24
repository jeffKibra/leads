import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import CustomTable from "../../components/customTable";
import ActionDelete from "../../components/actionDelete";
import { deleteData } from "../../modules/firestoreActions";

function createData(date, quizTitle, quizDescription, handleDelete) {
  return {
    date,
    quizTitle,
    quizDescription,
    action: (
      <Grid container justify="space-around">
        <ActionDelete handleDelete={handleDelete} />
      </Grid>
    ),
  };
}

const headCells = [
  {
    id: "number",
    numeric: false,
    label: "No.",
  },
  { id: "date", numeric: false, label: "Date" },
  { id: "quizTitle", numeric: false, label: "Quiz Title" },
  { id: "quizDescription", numeric: false, label: "QuizDescription" },
  { id: "action", numeric: false, label: "Action" },
];

export default function AssignedQuizList(props) {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.firebase.auth);
  const { quizList, group, groupId } = props;

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(quizList);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = quizList.map((quiz, index) => {
      const { quizTitle, quizDescription, date, quizId } = quiz;

      const handleDelete = () => {
        dispatch(
          deleteData(`executives/${auth.uid}/${group}/${groupId}/quiz`, quizId)
        );
      };

      return createData(date, quizTitle, quizDescription, handleDelete);
    });

    setDataRows(reloadedRows);
  }, [quizList, dispatch, auth.uid, group, groupId]);

  const handleSearch = (value) => {
    const newData = dataRows.filter(
      (row) => row.name.toUpperCase().indexOf(value) > -1
    );

    setRows(newData);
  };

  return (
    <CustomTable
      handleSearch={handleSearch}
      rows={rows}
      headCells={headCells}
      title="Assigned Quizzes"
    />
  );
}

AssignedQuizList.propTypes = {
  group: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  quizList: PropTypes.array.isRequired,
};
