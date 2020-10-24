import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import CustomTable from "../../components/customTable";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";
//import Actions from "../../components/actions";
import { deleteData } from "../../modules/firestoreActions";

function createData(
  quizTitle,
  quizDescription,
  date,
  status,
  id,
  handleDelete
) {
  return {
    quizTitle,
    quizDescription,
    date,
    status,
    // action: (
    //   <Actions
    //     handleDelete={() => handleDelete(id)}
    //     editRoute={`editSingleQuiz/${id}`}
    //     id={id}
    //   />
    // ),
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
  // { id: "action", numeric: false, label: "Action" },
];

function SingleQuizList(props) {
  const dispatch = useDispatch();
  const { loadedData } = props;
  //console.log(loadedData);

  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState(loadedData);

  useEffect(() => {
    setRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    const handleDelete = (id) => {
      dispatch(deleteData("singleQuiz", id));
    };

    const reloadedRows = loadedData.map((quiz, index) => {
      const { quizTitle, quizDescription, date, status, quizId } = quiz;
      return createData(
        quizTitle,
        quizDescription,
        date,
        status,
        quizId,
        handleDelete
      );
    });

    setDataRows(reloadedRows);
  }, [loadedData, dispatch]);

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
      title="Quiz"
    />
  );
}

export default IsLoadedIsEmptyHOC(SingleQuizList);
