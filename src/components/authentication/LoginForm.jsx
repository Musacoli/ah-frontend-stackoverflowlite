import React from 'react';
import PropTypes from 'prop-types';
import Form from 'forms';
import Input from 'forms/Input';

const LoginForm = ({ successSubmit }) => (
  <Form
    name="login-form"
    button={{ className: 'btn-primary btn-block', text: 'Login' }}
    action="/users/login/"
    beforeSubmit={data => ({ user: data })}
    successSubmit={successSubmit}
    slot={
      <div>
        <hr />
      </div>
    }
  >
    <Input name="username" type="username" label="username" />
    <Input name="password" type="password" label="password" />
  </Form>
);

LoginForm.propTypes = {
  successSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
