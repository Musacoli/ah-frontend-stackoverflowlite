import React from 'react';
import { shallow } from 'enzyme';
import SignupModal from './SignupModal';

describe('SignupModal', () => {
  test('Modal onHide triggers the hideModal', () => {
    const hideModal = jest.fn();
    const wrapper = shallow(
      <SignupModal hideModal={hideModal} signupData="" show signupHandler={jest.fn()} />,
    );

    wrapper.prop('onHide')();
    expect(hideModal).toHaveBeenCalledWith('signup');
  });
});
