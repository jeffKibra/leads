import React from "react";
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faTrashAlt,
  faLockOpen,
  faUserEdit,
  faSave,
  faPlus,
  faTimes,
  faStickyNote,
  faArrowLeft,
  faEllipsisV,
  faCog,
  faHome,
  faKey,
  faUserLock,
  faUser,
  faBars,
  faUserCircle,
  faCheck,
  faAngleUp,
  faAngleDown,
  faUndo,
  faTachometerAlt,
  faBook,
  faUsers,
  faShoppingCart,
  faChartBar,
  faChartLine,
  faChartPie,
  faSignOutAlt,
  faSignInAlt,
  faCopy,
  faShareAlt,
  faEnvelope,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faEdit,
  faTrashAlt,
  faLockOpen,
  faUserEdit,
  faSave,
  faPlus,
  faTimes,
  faStickyNote,
  faArrowLeft,
  faEllipsisV,
  faCog,
  faHome,
  faKey,
  faUserLock,
  faUser,
  faBars,
  faUserCircle,
  faCheck,
  faAngleUp,
  faAngleDown,
  faUndo,
  faTachometerAlt,
  faBook,
  faUsers,
  faShoppingCart,
  faChartBar,
  faChartLine,
  faChartPie,
  faSignOutAlt,
  faSignInAlt,
  faCopy,
  faShareAlt,
  faEnvelope,
  faPlay
);

export default function ThemeWrapper(props) {
  const { children } = props;

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#4e73df", //"#17a2b8",
      },
      secondary: {
        main: "#ffc107",
      },
      background: {
        default: "#eeeeee",
      },
      custom: {
        green: "#1cc88a",
        cyan: "#36b9cc",
        yellow: "#f6c23e",
      },
    },
    overrides: {
      MuiListItemText: {
        primary: {
          fontSize: 12,
        },
      },
      MuiAccordion: {
        root: {
          "&:before": {
            content: "",
          },
        },
      },
    },
    props: {
      MuiAccordion: {
        elevation: 0,
      },
      MuiFab: {
        color: "primary",
      },
      MuiButton: {
        variant: "contained",
        color: "primary",
      },
      MuiButtonGroup: {
        variant: "contained",
        color: "secondary",
      },
      MuiTextField: {
        size: "small",
        color: "primary",
        variant: "outlined",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
