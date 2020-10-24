import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import {
  List,
  Divider,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CustomAccordion from "../../components/customAccordion";
import QuizNav from "./quizNav";
import ProductsNav from "./productsNav";
import ExecutivesNav from "./executivesNav";
import ReportsNav from "./reportsNav";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: 224,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    icon: {
      color: theme.palette.common.white,
    },
    dashboard: {
      padding: theme.spacing(2, 3),
      "&:focus": {
        backgroundColor: theme.palette.primary.light,
      },
      //padding: theme.spacing(1),
    },
  };
});

export default function DrawerContent(props) {
  const classes = useStyles();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <List className={classes.root}>
        <ListItem
          selected={location.pathname === "/"}
          button
          component={Link}
          to="/"
          className={classes.dashboard}
        >
          <ListItemIcon className={classes.icon}>
            <FontAwesomeIcon icon="tachometer-alt" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <Divider />
        <CustomAccordion
          tag="Executives"
          expanded={expanded}
          handleAccordion={handleAccordion}
          render={() => {
            return <FontAwesomeIcon icon="users" />;
          }}
        >
          <ExecutivesNav />
        </CustomAccordion>
        <CustomAccordion
          tag="Products"
          expanded={expanded}
          handleAccordion={handleAccordion}
          render={() => {
            return <FontAwesomeIcon icon="shopping-cart" />;
          }}
        >
          <ProductsNav />
        </CustomAccordion>

        <Divider />

        <CustomAccordion
          tag="Quiz"
          expanded={expanded}
          handleAccordion={handleAccordion}
          render={() => {
            return <FontAwesomeIcon icon="book" />;
          }}
        >
          <QuizNav />
        </CustomAccordion>
        <CustomAccordion
          tag="Reports"
          expanded={expanded}
          handleAccordion={handleAccordion}
          render={() => {
            return <FontAwesomeIcon icon="chart-pie" />;
          }}
        >
          <ReportsNav />
        </CustomAccordion>
      </List>
    </>
  );
}
