import types from '../types/forms';
/**
 * Updates a given form's value
 * @param  {Object} state
 * @param  {Object} payload
 * @return {Object}
 */
const updateFormValue = (state, payload) => {
  const { form: formName, name, value } = payload;

  return {
    ...state,
    [formName]: {
      ...state[formName],
      data: {
        ...state[formName].data,
        [name]: value,
      },
    },
  };
};
/**
 * Updates a given's forms errors
 * @param  {Object} state
 * @param  {String} options.form
 * @param  {Object} options.errors
 * @return {Object}
 */
const updateFormErrors = (state, { form, errors }) => ({
  ...state,
  [form]: {
    ...state[form],
    errors,
  },
});

/**
 * Resets a given forms state
 * @param  {Object} state
 * @param  {String} form
 * @return {Object}
 */
const resetForm = (state, form) => ({
  ...state,
  [form]: {
    data: {},
    errors: {},
  },
});

/**
 * Updates the forms state based on the dispatched action
 * @param  {Object} state  current state
 * @param  {Object} action
 * @return {Object}        next state
 */

export default (state = {}, action) => {
  switch (action.type) {
    case types.REGISTER_FORM:
      return { ...state, [action.payload.name]: { data: action.payload.data, errors: {} } };
    case types.UPDATE_VALUE:
      return updateFormValue(state, action.payload);
    case types.UPDATE_ERRORS:
      return updateFormErrors(state, action.payload);
    case types.RESET_FORM:
      return resetForm(state, action.form);
    default:
      return state;
  }
};
