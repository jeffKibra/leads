import React from "react";
import { Bar } from "react-chartjs-2";
import { Grid, Card, CardContent, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { isEmpty } from "react-redux-firebase";
// import { Empty } from "antd";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: theme.spacing(2, 0),
    },
    card: (props) => {
      return {
        width: "100%",
        margin: theme.spacing(3, 0),
      };
    },
    wrapper: {
      position: "relative",
      height: "10rem",
      [theme.breakpoints.up("sm")]: {
        height: "15rem",
      },
      [theme.breakpoints.up("md")]: {
        height: "20rem",
      },
    },
  };
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BarGraph(props) {
  const theme = useTheme();
  const classes = useStyles();
  const monthIndex = new Date().getMonth();

  const { numberOfDays, rawData, year } = props;

  const month = months[monthIndex];

  const dates = () => {
    const arr = [];
    for (var i = 1; i <= numberOfDays; i++) {
      arr.push(i);
    }
    return arr;
  };
  const randData = () => {
    const arr = [];
    rawData.forEach((row) => {
      // console.log(row);
      const x = new Date(row.date).getDate();
      const y = row.leads;
      arr.push({ x: x, y: y });
    });
    return arr;
  };

  const data = {
    labels: dates(),
    datasets: [
      {
        label: `${month} ${year} Leads`,
        data: randData(),
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: "#6e707e",
      titleFontSize: 14,
      borderColor: "#dddfeb",
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: "index",
      caretPadding: 10,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            offsetGridLines: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            drawBorder: false,
            borderDash: [2],
          },
        },
      ],
    },
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Grid container justify="center">
            <Grid item xs={11} className={classes.wrapper}>
              <Bar data={data} options={options} redraw={true} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

BarGraph.propTypes = {
  rawData: PropTypes.array,
  // monthIndex: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  numberOfDays: PropTypes.number.isRequired,
};
