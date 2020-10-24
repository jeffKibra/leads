import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import CustomTable from "../../components/customTable";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";
import Actions from "../../components/actions";
import { deleteData } from "../../modules/firestoreActions";
// import ActionsSee from "../../components/actionsSee";

function createData(
  quizTitle,
  quizDescription,
  date,
  status,
  editRoute,
  handleDelete
) {
  return {
    quizTitle,
    quizDescription,
    date,
    status,
    action: <Actions handleDelete={handleDelete} editRoute={editRoute} />,
  };
}

const headCells = [
  {
    id: "number",
    numeric: false,
    label: "No.",
  },
  { id: "quizTitle", numeric: false, label: "Quiz Title" },
  { id: "quizDescription", numeric: false, label: "Quiz Description" },
  { id: "date", numeric: false, label: "Date" },
  { id: "status", numeric: false, label: "status" },
  { id: "action", numeric: false, label: "Action" },
];

function QuizList(props) {
  const dispatch = useDispatch();
  const { loadedData, collection, title } = props;
  console.log(loadedData);

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(loadedData);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const reloadedRows = loadedData.map((quiz, index) => {
      const { quizTitle, quizDescription, date, status, quizId } = quiz;

      const handleDelete = () => {
        dispatch(deleteData(collection, quizId));
      };
      const editRoute = `/previewQuiz/${collection}/${quizId}`;

      return createData(
        quizTitle,
        quizDescription,
        date,
        status,
        editRoute,
        handleDelete
      );
    });

    setDataRows(reloadedRows);
  }, [loadedData, dispatch, collection]);

  const handleSearch = (value) => {
    const newData = dataRows.filter(
      (row) => row.quizTitle.toUpperCase().indexOf(value) > -1
    );

    setRows(newData);
  };

  return (
    <CustomTable
      handleSearch={handleSearch}
      rows={rows}
      headCells={headCells}
      title={title}
    />
  );
}

export default IsLoadedIsEmptyHOC(QuizList);
