import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableContainer,
  TablePagination,
  Grid,
} from "@material-ui/core";

import CustomTableHead from "./customTableHead";
import CustomTableBody from "./customTableBody";
import CustomTableToolbar from "./customTableToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  paper: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 750,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.light,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function CustomTableComponent(props) {
  const classes = useStyles();

  const {
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    rows,
    order,
    orderBy,
    page,
    rowsPerPage,
    getComparator,
    stableSort,
    headCells,
    handleSearch,
    title,
  } = props;

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <CustomTableToolbar handleSearch={handleSearch} title={title} />
            <TableContainer>
              <Table
                //stickyHeader
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <CustomTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  headCells={headCells}
                />
                <CustomTableBody
                  headCells={headCells}
                  rowsPerPage={rowsPerPage}
                  rows={rows}
                  page={page}
                  order={order}
                  orderBy={orderBy}
                  stableSort={stableSort}
                  getComparator={getComparator}
                />
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
}

CustomTableComponent.propTypes = {
  rows: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
