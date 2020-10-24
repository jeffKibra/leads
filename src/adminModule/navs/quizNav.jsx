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
        Add Quiz
      </Typography>

      <DrawerListItem to="/addQuiz">
        <ListItemText primary="Add Quiz" />
      </DrawerListItem>

      <Typography variant="caption" className={classes.text}>
        MANAGE QUIZ
      </Typography>
      <DrawerListItem to="/singleQuiz">
        <ListItemText primary="Single Quiz" />
      </DrawerListItem>
      <DrawerListItem to="/groupQuiz">
        <ListItemText primary="Group Quiz" />
      </DrawerListItem>

      <Typography variant="caption" className={classes.text}>
        QUIZ WINNER
      </Typography>

      <DrawerListItem to="/addWinner">
        <ListItemText primary="Add Winner" />
      </DrawerListItem>
    </>
  );
}
