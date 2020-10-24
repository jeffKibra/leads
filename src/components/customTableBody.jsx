import React from "react";
import PropTypes from "prop-types";
import { TableBody, TableRow, TableCell } from "@material-ui/core";

export default function CustomTableBody(props) {
  const dense = false;

  const {
    //selected,
    rowsPerPage,
    rows,
    page,
    stableSort,
    getComparator,
    order,
    orderBy,
    //handleClick,
    headCells,
  } = props;

  //const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const filteredData = headCells.filter((headCell) => headCell.id !== "number");
  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          //const isItemSelected = isSelected(row.name);
          // const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <TableRow
              hover
              //onClick={(event) => handleClick(event, row.name)}
              role="table row"
              // aria-checked={isItemSelected}
              tabIndex={-1}
              key={index}
              //selected={isItemSelected}
            >
              <TableCell align="left">{index + 1}</TableCell>
              {filteredData.map((headCell, i) => {
                return (
                  <TableCell key={i} align="left">
                    {row[headCell.id]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

CustomTableBody.propTypes = {
  rows: PropTypes.array.isRequired,
};
