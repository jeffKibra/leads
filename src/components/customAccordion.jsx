import React from "react";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      padding: theme.spacing(1),
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
    details: {
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
    },
    detailsContent: {},
    card: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(1, 1),
      //margin: theme.spacing(1, 2),
    },
    icon: {
      color: theme.palette.common.white,
    },
    tag: {
      paddingLeft: theme.spacing(5),
    },
  };
});

export default function CustomAccordion(props) {
  const classes = useStyles();
  const { expanded, tag, handleAccordion, children, render } = props;
  return (
    <Accordion
      expanded={expanded === tag}
      onChange={handleAccordion(tag)}
      className={classes.root}
    >
      <AccordionSummary
        expandIcon={<ExpandMore className={classes.icon} />}
        arial-label="expand more"
        aria-controls="additional controls"
        id="exapnd-menu"
      >
        {render()}
        <Typography variant="caption" className={classes.tag}>
          {tag}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <Card className={classes.card}>{children}</Card>
      </AccordionDetails>
    </Accordion>
  );
}
