import React from "react";
import { Grid, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import DashboardCard from "../../components/dashboardCard";
//import BarGraph from "../../components/barGraph";
import Graph from "./graph";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {
      margin: "0 -12px ",
      // padding: theme.spacing(2),
    },
  };
});

export default function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { executives, products, singleQuiz, groupQuiz } = props;

  return (
    <>
      {" "}
      <div className={classes.root}>
        <Grid container justify="space-around">
          {" "}
          <DashboardCard
            name="Executives"
            number={executives}
            to="/executives"
            icon="users"
            borderColor={theme.palette.primary.main}
          />
          <DashboardCard
            name="Products"
            number={products}
            to="/productsList"
            icon="shopping-cart"
            borderColor={theme.palette.custom.green}
          />
          <DashboardCard
            name="Single Quiz"
            number={singleQuiz}
            to="/singleQuiz"
            icon="book"
            borderColor={theme.palette.custom.cyan}
          />
          <DashboardCard
            name="Group Quiz"
            number={groupQuiz}
            to="/groupQuiz"
            icon="users"
            borderColor={theme.palette.custom.yellow}
          />
        </Grid>
      </div>
      <Graph />
    </>
  );
}

Dashboard.propTypes = {
  executives: PropTypes.number,
  products: PropTypes.number,
  singleQuiz: PropTypes.number,
  groupQuiz: PropTypes.number,
};
