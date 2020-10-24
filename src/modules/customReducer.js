import {
  NEW_USER,
  EMAIL,
  LINEAR_PROGRESS,
  SHOW_PROGRESS,
  EMAIL_CHECKED,
} from "./basicActions";

const initialState = {
  msg: "",
  email: "",
  isNewUser: false,
  emailChecked: false,
  loading: false,
  linearProgress: 0,
  showProgress: false,
  current: 0,
  validated: false,
  finish: false,
  steps: [
    { title: "Email", content: "Confirm Email" },
    { title: "Password", content: "Type in your Password" },
  ],
};

const customReducer = (state = initialState, action) => {
  //console.log(action);
  let msg, loading, current;
  switch (action.type) {
    case NEW_USER:
      return { ...state, isNewUser: action.isNewUser };
    case LINEAR_PROGRESS:
      return { ...state, linearProgress: action.progress };
    case SHOW_PROGRESS:
      return { ...state, showProgress: action.showProgress };
    case EMAIL:
      return { ...state, email: action.email };
    case EMAIL_CHECKED:
      return { ...state, emailChecked: action.checked };
    case "LOADING":
      loading = action.loading;
      return {
        ...state,
        loading,
      };

    case "NEXT":
      current = state.current + 1;
      return { ...state, current };
    case "PREV":
      current = state.current - 1;
      return { ...state, current };

    case "SET_MSG":
      msg = action.msg;
      return { ...state, msg };
    default:
      return state;
  }
};

export default customReducer;
