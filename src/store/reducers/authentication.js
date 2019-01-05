import types from '../types/authentication';

const initialstate = {
  showModals: { login: false, signup: false, passwordReset: false },
  user: JSON.parse(localStorage.getItem('user') || null),
};

const updateModal = (state, name, value) => ({
  ...state,
  showModals: {
    ...state.showModals,
    [name]: value,
  },
});

export default (state = initialstate, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      return updateModal(state, action.name, true);
    case types.HIDE_MODAL:
      return updateModal(state, action.name, false);
    case types.LOGIN_USER:
      // we will temporarily store the user's token in localStorage
      // but we will come back to this in future
      localStorage.setItem('user', JSON.stringify(action.user));
      return { ...state, user: action.user };
    case types.UNSET_USER:
      localStorage.removeItem('user');
      return { ...state, user: null };
    default:
      return state;
  }
};
