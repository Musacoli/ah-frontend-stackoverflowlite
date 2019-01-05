import types from '../types/forms';

export const registerForm = (name, data) => ({
  type: types.REGISTER_FORM,
  payload: { name, data },
});

export const updateValue = (form, name, value) => ({
  type: types.UPDATE_VALUE,
  payload: { form, name, value },
});

export const updateErrors = (form, errors) => ({
  type: types.UPDATE_ERRORS,
  payload: { errors, form },
});

export const resetForm = form => ({ type: types.RESET_FORM, form });

export const submitForm = ({ url, method, data }) => (dispatch, getState, http) =>
  http.withAuthentication()[method](url, data);
