import types from '../types/authentication';

export const showAuthModal = name => ({ type: types.SHOW_MODAL, name });
export const hideAuthModal = name => ({ type: types.HIDE_MODAL, name });
export const setUser = user => ({ type: types.LOGIN_USER, user });
export const unsetUser = () => ({ type: types.UNSET_USER });
export const loginUser = user => (dispatch, getState, http) => {
  // we will set the token every time a user is logged in
  http.setToken(user.token);

  dispatch(setUser(user));
};


export const logoutUser = history => (dispatch, getState, http) =>
  window.Notify.confirm('You will be logged out of the application').then(() => {
    window.Notify.success('You were successfully logged out of the system');
    history.push('/');
    // we will clear any available tokens
    http.clearToken();

    return dispatch(unsetUser());
  });

export const showResetPasswordModal = () => dispatch => {
  dispatch(hideAuthModal('login'));
  return dispatch(showAuthModal('passwordReset'));
};
