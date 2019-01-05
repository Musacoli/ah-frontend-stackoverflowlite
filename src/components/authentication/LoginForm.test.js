import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('default beforeSubmit nests the form data into a user object', () => {
    const data = { email: 'krm@example.com' };
    const wrapper = shallow(
      <LoginForm successSubmit={jest.fn()} handleAuthentication={jest.fn()} />,
    );

    expect(wrapper.prop('beforeSubmit')(data)).toEqual({ user: data });
  });
});
