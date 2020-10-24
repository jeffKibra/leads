import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  // console.log(theme);
  return {
    flex: {
      display: "flex",
      //flexDirection: "column",
      flexWrap: "wrap",
      flexGrow: 1,
    },
    avatar: {
      width: 70,
      height: 70,
      fontSize: 24,
    },
    menuAvatar: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      height: 200,
      width: "100%",
      backgroundColor: theme.palette.primary.main,
    },
    menuItem: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    bookPlan: {
      //height: 60,
      width: "100%",
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    avatarBg: {
      backgroundColor: theme.palette.primary.main,
    },
    bookIcon: {
      fontSize: "2rem",
      color: theme.palette.primary.main,
    },
    zeroEntries: {
      fontSize: "5rem",
      color: theme.palette.secondary.main,
      margin: theme.spacing(1),
    },
    empty: {
      height: 500,
      maxHeight: "60%",
      margin: theme.spacing(1),
    },
    link: {
      color: "#000",
      textDecoration: "none",
      "&:hover": {
        color: "#000",
        textDecoration: "none",
      },
    },
    vertCenter: {
      alignContent: "center",
    },
    horCenter: {
      justifyContent: "center",
    },
    root: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    paper: (props) => {
      //console.log(props);
      return {
        flexDirection: "column",
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: "center",
        backgroundColor: props.color,
        //background: `linear-gradient(45deg, ${theme.palette.primary.main} 40%, ${props.color} 60%)`,
      };
    },
    card: {
      //padding: theme.spacing(1),
      margin: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    cardFlex: {
      display: "flex",
      flexDirection: "column",
    },
    cardAuth: {
      maxWidth: 500,
    },
    cardWidth: {
      width: 250,
      maxWidth: "90%",
      height: 300,
    },
    cardActions: {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(3),
      marginBottom: 0,
    },
    cardActionsContainer: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
      alignItems: "flex-end",
      alignContent: "flex-end",
    },
    textField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    bookCard: {
      width: 400,
      maxWidth: "90%",
    },
    fab: {
      position: "fixed",
      right: " 5%",
      bottom: "8%",
    },
    readFab: {
      fontSize: "1.5rem",
    },
    margin: {
      margin: theme.spacing(1),
    },
    error: {
      backgroundColor: theme.palette.error.main,
    },
    success: {
      backgroundColor: theme.palette.success.main,
    },
    mainIcon: {
      fontSize: "10rem",
      color: theme.palette.primary.main,
    },
    button: (props) => ({
      background: `linear-gradient(45deg, ${props.color} 30%, ${theme.palette.secondary.main} 90% )`,
    }),

    //menuButton: { marginRight: theme.spacing(2) },
    title: { flexGrow: 1, fontSize: 24, marginLeft: theme.spacing(2) },

    fullList: {
      width: "auto",
    },
    //list
    listRoot: {
      width: "100%",
      maxWidth: "100vw",
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflowX: "hidden",
      overflowY: "auto",
    },
    listSection: {
      backgroundColor: "inherit",
    },
    listUl: {
      backgroundColor: "inherit",
      padding: 0,
    },
    listInline: {
      display: "inline",
    },
    listItem: {
      cursor: "pointer",
    },
  };
});

/*const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#17a2b8",
    },
    secondary: {
      main: "#ffc107",
    },
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: "secondary",
    },
  },
});*/

export { useStyles };
