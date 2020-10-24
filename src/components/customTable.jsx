import React from "react";
import PropTypes from "prop-types";

import CustomTableComponent from "./customTableComponent";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function CustomTable(props) {
  const { rows, headCells, handleSearch, title } = props;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <CustomTableComponent
      getComparator={getComparator}
      stableSort={stableSort}
      rowsPerPage={rowsPerPage}
      page={page}
      rows={rows}
      order={order}
      orderBy={orderBy}
      handleRequestSort={handleRequestSort}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleChangePage={handleChangePage}
      headCells={headCells}
      handleSearch={handleSearch}
      title={title}
    />
  );
}

CustomTable.propTypes = {
  rows: PropTypes.array,
  headCells: PropTypes.array,
  handleSearch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
