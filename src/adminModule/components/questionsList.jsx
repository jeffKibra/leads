import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import CustomTable from "../../components/customTable";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";
import Actions from "../../components/actions";
import { deleteData } from "../../modules/firestoreActions";

function createData(
  question,
  choice1,
  choice2,
  choice3,
  choice4,
  editRoute,
  handleDelete
) {
  return {
    question,
    choice1,
    choice2,
    choice3,
    choice4,
    action: <Actions handleDelete={handleDelete} editRoute={editRoute} />,
  };
}

const headCells = [
  {
    id: "number",
    numeric: false,
    label: "No.",
  },
  { id: "question", numeric: false, label: "Question" },
  { id: "choice1", numeric: false, label: "Choice 1" },
  { id: "choice2", numeric: false, label: "Choice 2" },
  { id: "choice3", numeric: false, label: "Choice 3" },
  { id: "choice4", numeric: false, label: "Choice 4" },
  { id: "action", numeric: false, label: "Action" },
];

function QuestionsList(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { collection, quizId } = params;

  const { loadedData } = props;
  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(loadedData);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = loadedData.map((data, index) => {
      const { question, choice1, choice2, choice3, choice4, questionId } = data;

      const handleDelete = () => {
        dispatch(deleteData(`${collection}/${quizId}/answers`, questionId));
        dispatch(deleteData(`${collection}/${quizId}/questions`, questionId));
      };

      const editRoute = `/editQuestion/${collection}/${quizId}/${questionId}`;

      return createData(
        question,
        choice1,
        choice2,
        choice3,
        choice4,
        editRoute,
        handleDelete
      );
    });

    setDataRows(reloadedRows);
  }, [loadedData, dispatch, collection, quizId]);

  const handleSearch = (value) => {
    const newData = dataRows.filter(
      (row) => row.question.toUpperCase().indexOf(value) > -1
    );

    setRows(newData);
  };

  return (
    <CustomTable
      handleSearch={handleSearch}
      rows={rows}
      headCells={headCells}
      title="Questions List"
    />
  );
}

export default IsLoadedIsEmptyHOC(QuestionsList);
