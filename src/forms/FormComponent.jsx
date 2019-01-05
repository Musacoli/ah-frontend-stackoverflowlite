import React from 'react';
import PropTypes from 'prop-types';
import { isFunction, get, isPlainObject } from 'lodash';
import { connect } from 'react-redux';
import {
  registerForm,
  updateValue,
  submitForm,
  updateErrors,
  resetForm,
} from 'store/actions/forms';
import { mapStateToProps } from 'store/helpers';
import FormErrors from './FormErrors';
import Button from './Button';

class FormComponent extends React.Component {
  /**
   * Creates an instance of the FormComponent class
   * @param  {Object} props
   * @return {FormComponent}
   */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.updateFormValue = this.updateFormValue.bind(this);
    this.customInputs = ['BaseInput', 'Input', 'TextArea', 'CustomTagInput'];
    this.updateErrors = this.updateErrors.bind(this);
    this.doneSubmitting = this.doneSubmitting.bind(this);
  }

  /**
   * Listen for when the form is  mounted to the DOM
   */
  componentDidMount() {
    const { register, name, defaultData } = this.props;

    // we will let the store know about our form once it has been mounted to the DOM
    register(name, defaultData);
  }

  /**
   * Gets the currents form data
   * @return {Object}
   */
  getFormData() {
    return this.getFormProp('data', {});
  }

  /**
   * Gets the current form's errors
   * @return {Object}
   */
  getFormErrors() {
    return new FormErrors(this.getFormProp('errors', {}));
  }

  /**
   * Gets a given forms prop
   * @param  {String} prop
   * @param  {Mixed} defaultValue
   * @return {Mixed}
   */
  getFormProp(prop, defaultValue) {
    const { name, forms } = this.props;

    return get(forms, `${name}.${prop}`, defaultValue);
  }

  /**
   * Callback hanlder for when the form has been submitted
   * @param  {Mixed} data
   */
  doneSubmitting(data) {
    const { successSubmit, name, resetFormData } = this.props;

    // if the developer gave us the successSubmit callback, we will invoke it with
    // the returned response

    let successivelySubmited = true;

    if (successSubmit) {
      successivelySubmited = successSubmit(data, this);
    }

    // Now that our job is done, we will have to clear the form's data
    //  if the form was successively submitted we clear it
    //
    if (successivelySubmited !== false) {
      resetFormData(name);
    }

    // return a promise just in case the dev has any other personal businesses to accomplish
    return Promise.resolve(data);
  }

  /**
   * Updates the form Errors
   * @param  {Object} errors
   */
  updateErrors(response) {
    const { onError, name, updateFormErrors } = this.props;
    const errors = get(response, 'errors', response);

    // first, we will trigger any error handler the developer gave us
    if (onError) {
      onError(errors);
    }
    // next, we will let the store know that some things didn't go well
    updateFormErrors(name, errors);
  }

  /**
   * Updates form's value
   * @param  {String} name
   * @param  {Mixed} value
   */
  updateFormValue(name, value) {
    const { updateFormValue, name: form } = this.props;

    updateFormValue(form, name, value);
  }

  /**
   * Determines if a given string is a custom input
   * @param  {Element}  name
   * @return {Boolean}
   */
  isCustomInput(child) {
    return child.type && this.customInputs.includes(child.type.displayName);
  }

  /**
   * Submits the current form
   * @param  {Event} e
   */
  submit(e) {
    e.preventDefault();
    const { handleSubmit, beforeSubmit } = this.props;

    // if the developer gave us a handleSubmit, we will assume   he wants to manually do
    // the submission so we will just invoke the callback with  the current form data and relax
    if (handleSubmit) {
      handleSubmit(this.getFormData(), this);
      return;
    }

    // we will trigger the before submit callback and let the developer massage the data
    // as he desires.

    const data = beforeSubmit(this.getFormData(), this);

    // however if he/she returns false, we will bail out of the process immediately
    if (!data) return;

    // if the developer gave us a form action, we will use the store's defaultFormSubmitter
    // that makes an http request to that action with the current data.

    const { action } = this.props;

    if (action) {
      this.submitUsingAction(action, data);
    }
  }

  /**
   * Submit a form using the available store's action
   * @param  {String} action form end point
   * @param  {Object} data
   * @return {Promise}
   */
  submitUsingAction(action, data) {
    return this.props
      .defaultFormSubmitter({ method: this.props.method, url: action, data })
      .then(this.doneSubmitting)
      .catch(this.updateErrors);
  }

  /**
   * Renders a form button
   * @see src/forms/Button
   */
  renderButton() {
    const { button } = this.props;

    // if the button is a callback, we will invoke it enabling the developer
    //  to render the button as he/she desires.
    if (isFunction(button)) return button();

    // if the developer gave us a string or an object, we will render the Button component

    return isPlainObject(button) ? <Button {...button} /> : <Button>{button}</Button>;
  }

  /**
   * Renders any form generic errors that don't specifically belong to any input
   * @return {Element}
   */
  renderGenericErrors() {
    const errors = this.getFormErrors();
    const { nonInputErrorFields } = this.props;

    // we will loop through the custom errors that the user has specified that don't belong
    // to any input components and render them separately

    const renderedErrros = nonInputErrorFields
      .filter(field => errors.has(field))
      .map((field, id) => <div key={id}>{errors.first(field)}</div>);

    return renderedErrros.length > 0 ? (
      <div>
        <div className="bg-danger text-white p-1" role="alert">
          {renderedErrros}
        </div>
        <hr />
      </div>
    ) : null;
  }

  /**
   * Render form contents
   * @return {Mixed}
   */
  renderFormChildren() {
    return React.Children.map(this.props.children, child => {
      // if a child is a custom input, we will pass it the required form props
      if (this.isCustomInput(child)) {
        return React.cloneElement(child, {
          handleChange: this.updateFormValue,
          errors: this.getFormErrors(),
          data: this.getFormData(),
        });
      }
      return child;
    });
  }

  /**
   * Component renderer function
   * @return {Element}
   */
  render() {
    const { method, action, slot } = this.props;

    return (
      <form method={method} action={action} onSubmit={this.submit} className="w-100">
        {this.renderGenericErrors()}
        {this.renderFormChildren()}
        {this.renderButton()}
        {slot}
      </form>
    );
  }
}

FormComponent.defaultProps = {
  action: null,
  method: 'post',
  defaultData: {},
  handleSubmit: null,
  successSubmit: null,
  beforeSubmit: data => data,
  onError: null,
  nonInputErrorFields: ['error'],
  slot: null,
};

FormComponent.propTypes = {
  action: PropTypes.string,
  successSubmit: PropTypes.func,
  button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({ text: PropTypes.string }),
  ]).isRequired,
  method: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired,
  defaultData: PropTypes.object,
  updateFormValue: PropTypes.func.isRequired,
  updateFormErrors: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  defaultFormSubmitter: PropTypes.func.isRequired,
  forms: PropTypes.object.isRequired,
  onError: PropTypes.func,
  beforeSubmit: PropTypes.func,
  resetFormData: PropTypes.func.isRequired,
  nonInputErrorFields: PropTypes.array,
  slot: PropTypes.any,
};

export const mapActionsToProps = dispatch => ({
  register: (name, data) => dispatch(registerForm(name, data)),
  updateFormValue: (form, name, value) => dispatch(updateValue(form, name, value)),
  defaultFormSubmitter: payload => dispatch(submitForm(payload)),
  updateFormErrors: (form, errors) => dispatch(updateErrors(form, errors)),
  resetFormData: form => dispatch(resetForm(form)),
});
export { FormComponent };

export default connect(
  mapStateToProps(['forms']),
  mapActionsToProps,
)(FormComponent);
