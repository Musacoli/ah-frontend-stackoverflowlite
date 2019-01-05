import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/helpers';
import PropTypes from 'prop-types';
import {
  hideAuthModal,
  loginUser,
} from '../../store/actions/authentication';
import LoginModal from '../../components/authentication/LoginModal';
import SignupModal from '../../components/authentication/SignupModal';

const AuthenticationModals = props => {
  const { showModals, hideModal, login, handleAuthentication, showResetPassword } = props;

  return (
    <React.Fragment>
      <LoginModal
        show={showModals.login}
        login={login}
        hideModal={hideModal}
        handleAuthentication={handleAuthentication}
        showResetPassword={showResetPassword}
      />
      <SignupModal show={showModals.signup} hideModal={hideModal} />
    </React.Fragment>
  );
};

export const mapActionsToProps = dispatch => ({
  hideModal: name => dispatch(hideAuthModal(name)),
  login: user => dispatch(loginUser(user)),
});

AuthenticationModals.propTypes = {
  hideModal: PropTypes.func.isRequired,
  showModals: PropTypes.shape({
    login: PropTypes.bool.isRequired,
    signup: PropTypes.bool.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps({
    signupData: 'authentication.signupData',
    showModals: 'authentication.showModals',
  }),
  mapActionsToProps,
)(AuthenticationModals);
