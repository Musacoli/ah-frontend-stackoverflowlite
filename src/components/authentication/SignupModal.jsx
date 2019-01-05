import React from 'react';
import Modal from 'components/utils/Modal';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';

const SignupModal = ({ show, hideModal }) => {
  const closeModal = () => hideModal('signup');

  return (
    <Modal title="Sign Up" show={show} onHide={closeModal}>
      <SignupForm onSuccess={closeModal} />
    </Modal>
  );
};

SignupModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default SignupModal;
