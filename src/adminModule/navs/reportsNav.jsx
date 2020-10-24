import React from "react";
import { ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DrawerListItem from "../../components/drawerListItem";

const useStyles = makeStyles((theme) => {
  return {
    text: {
      padding: theme.spacing(1, 2),
      color: theme.palette.text.disabled,
    },
  };
});

export default function QuizNav(props) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="caption" className={classes.text}>
        LEAD REPORTS
      </Typography>
      <DrawerListItem to="/executiveLeadReports">
        <ListItemText primary="Leads" />
      </DrawerListItem>

      {/* <DrawerListItem to="/executiveLeadReports">
        <ListItemText primary="Executive Reports" />
      </DrawerListItem>
      <DrawerListItem to="/doctorsList">
        <ListItemText primary="Doctors" />
      </DrawerListItem> */}

      <Typography variant="caption" className={classes.text}>
        QUIZ REPORTS
      </Typography>

      <DrawerListItem to="/doctorsQuizReports">
        <ListItemText primary="Doctors Reports" />
      </DrawerListItem>
      <DrawerListItem to="/groupQuizReports">
        <ListItemText primary="Group Reports" />
      </DrawerListItem>
    </>
  );
}
