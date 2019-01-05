import React from 'react';
import PropTypes from 'prop-types';
import NavBarComponent from '../components/NavBar';
import HeaderLinks from '../components/HeaderLinks';
import { showAuthModal } from '../store/actions/authentication';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '../store/helpers';
import { connect } from 'react-redux';

const DefaultLayout = ({ children, className, user, showModal }) => (
  <div className={className}>
  {user ? (<NavBarComponent /> ) : (<HeaderLinks showModal={showModal} />)}
    
    <div className="main">{children}</div>
  </div>
);

DefaultLayout.defaultProps = {
  className: '',
  user: null,
};

DefaultLayout.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.any,
  showModal: PropTypes.func.isRequired,
  user: PropTypes.object,

};

export const mapActionsToProps = dispatch => ({
  showModal: name => dispatch(showAuthModal(name)),
});

export { DefaultLayout }

export default withRouter(
  connect(
    mapStateToProps({ user: 'authentication.user'}),
    mapActionsToProps,
  )(DefaultLayout),
);
