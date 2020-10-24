export const SET_MSG = "SET_MSG";
export const LOADING = "LOADING";
export const NEW_USER = "NEW_USER";
export const EMAIL = "EMAIL";
export const LINEAR_PROGRESS = "LINEAR_PROGRESS";
export const SHOW_PROGRESS = "SHOW_PROGRESS";
export const EMAIL_CHECKED = "EMAIL_CHECKED";

export function setEmail(email) {
  return { type: EMAIL, email };
}

export function setNewUser(isNewUser) {
  return { type: NEW_USER, isNewUser };
}

export function setMsg(msg) {
  return { type: SET_MSG, msg };
}

export function setLoading(loading) {
  return { type: LOADING, loading: loading };
}

export function setLinearProgress(progress) {
  return { type: LINEAR_PROGRESS, progress };
}

export function setShowProgress(showProgress) {
  return { type: SHOW_PROGRESS, showProgress };
}

export function setEmailChecked(checked) {
  return { type: EMAIL_CHECKED, checked };
}
