import React from "react";
import { Grid, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DashboardCard from "../../components/dashboardCard";
import Graph from "./graph";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: "0 -12px ",
      // padding: theme.spacing(2),
    },
  };
});

function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { products, doctors, groupQuiz, singleQuiz } = props;

  return (
    <>
      {" "}
      <div className={classes.root}>
        <Grid container justify="space-around">
          {" "}
          <DashboardCard
            name="Doctors"
            number={doctors}
            to="/doctors"
            icon="users"
            borderColor={theme.palette.primary.main}
          />
          <DashboardCard
            name="products"
            number={products}
            to="/products"
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

export default Dashboard;
