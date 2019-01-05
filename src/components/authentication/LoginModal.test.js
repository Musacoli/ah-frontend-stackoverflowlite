import React from 'react';
import { shallow } from 'enzyme';
import LoginModal from './LoginModal';

describe('LoginModal', () => {
  test('test it triggers the default successMessage without crashing', () => {
    const wrapper = shallow(
      <LoginModal hideModal={jest.fn()} login={jest.fn()} show handleAuthentication={jest.fn()} />,
    );

    expect(() => wrapper.find('LoginForm').prop('successSubmit')({ user: {} })).not.toThrow();
  });

  test('Modal onHide triggers the hideModal', () => {
    const hideModal = jest.fn();
    const wrapper = shallow(
      <LoginModal hideModal={hideModal} login={jest.fn()} show handleAuthentication={jest.fn()} />,
    );

    wrapper.prop('onHide')();
    expect(hideModal).toHaveBeenCalledWith('login');
  });
});
