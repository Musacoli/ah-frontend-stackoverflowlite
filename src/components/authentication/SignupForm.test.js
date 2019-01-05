import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from './SignupForm';

describe('signup form tests', () => {
  test('onSuccess hides the modal', () => {
    const onSuccess = jest.fn();
    const wrapper = shallow(<SignupForm onSuccess={onSuccess} />);

    wrapper.prop('successSubmit')();

    expect(onSuccess).toHaveBeenCalled();
  });

  test("it returns false if passwords don't match", () => {
    const wrapper = shallow(<SignupForm onSuccess={jest.fn()} />);

    expect(
      wrapper.prop('beforeSubmit')(
        {
          password: 'some-password',
          password_confirmation: 'different',
        },
        { updateErrors: jest.fn() },
      ),
    ).toBeFalsy();
  });

  test('it nests the form data in the user object', () => {
    const wrapper = shallow(<SignupForm onSuccess={jest.fn()} />);
    const data = {
      password: 'password',
      password_confirmation: 'password',
      email: 'rolandmbasa@gmail.com',
    };
    expect(wrapper.prop('beforeSubmit')(data)).toEqual({ user: data });
  });
});
