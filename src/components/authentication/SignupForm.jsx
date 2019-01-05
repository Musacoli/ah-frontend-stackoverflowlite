import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'forms';

const SignupForm = ({ onSuccess }) => (
  <Form
    name="login-form"
    action="/users/"
    button={() => (
      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
      </div>
    )}
    beforeSubmit={(data, form) => {
      if (data.password && data.password_confirmation === data.password) return { user: data };
      form.updateErrors({ password_confirmation: ['Passwords do not match'] });
      // don't submit
      return false;
    }}
    successSubmit={data => {
      window.Notify.success(
        'You have been successfully registered .Please check your email and verify your account ',
      );
      onSuccess(data);
    }}
  >
    <Input name="firstname" label="firstname" required />
    <Input name="surname" label="surname" required />
    <Input name="username" label="Username" required />
    <Input name="email" label="Email" type="email" required />
    <Input name="password" label="Password" type="password" required />
    <Input name="password_confirmation" label="Confirm Password" type="password" required />
  </Form>
);

SignupForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default SignupForm;
