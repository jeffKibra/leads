import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List, Divider, ListItem, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";

import PositionedPopper from "../../components/positionedPopper";
import DoctorsNav from "./doctorsNav";
import LeadsNav from "./leadsNav";
import QuizNav from "./quizNav";
import ReportsNav from "./reportsNav";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(2),
      "&:focus": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  };
});

export default function DrawerContent(props) {
  const classes = useStyles();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [targetString, setTargetString] = useState();
  const [children, setChildren] = useState(null);

  useEffect(() => {
    switch (targetString) {
      case "doctors":
        setChildren(<DoctorsNav />);
        break;
      case "leads":
        setChildren(<LeadsNav />);
        break;
      case "quiz":
        setChildren(<QuizNav />);
        break;
      case "reports":
        setChildren(<ReportsNav />);
        break;
      default:
        setChildren(null);
        break;
    }
  }, [targetString]);

  const handlePopper = (newTargetString) => (e) => {
    setAnchorEl(e.currentTarget);
    setOpen((prevOpen) => targetString !== newTargetString || !prevOpen);
    setTargetString(newTargetString);
  };

  const handleDashboard = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <PositionedPopper placement="right" open={open} anchorEl={anchorEl}>
        {children}
      </PositionedPopper>
      <List>
        <ListItem
          onClick={handleDashboard}
          component={Link}
          to="/"
          selected={location.pathname === "/"}
          button
          className={classes.root}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <FontAwesomeIcon icon="tachometer-alt" />
            <Typography variant="caption">Dashboard</Typography>
          </Box>
        </ListItem>
        <Divider />

        <ListItem
          onClick={handlePopper("doctors")}
          button
          className={classes.root}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <FontAwesomeIcon icon="users" />
            <Typography variant="caption">Doctors</Typography>
          </Box>
        </ListItem>

        <ListItem
          onClick={handlePopper("leads")}
          button
          className={classes.root}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <FontAwesomeIcon icon="chart-line" />
            <Typography variant="caption">Leads</Typography>
          </Box>
        </ListItem>

        <Divider />

        <ListItem
          onClick={handlePopper("quiz")}
          button
          className={classes.root}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <FontAwesomeIcon icon="book" />
            <Typography variant="caption">Quiz</Typography>
          </Box>
        </ListItem>

        <ListItem
          onClick={handlePopper("reports")}
          button
          className={classes.root}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <FontAwesomeIcon icon="chart-pie" />
            <Typography variant="caption">Reports</Typography>
          </Box>
        </ListItem>
      </List>
    </>
  );
}
