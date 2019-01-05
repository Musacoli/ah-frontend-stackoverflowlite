import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import logo from '../logo.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAuthModal, logoutUser } from '../store/actions/authentication';
import { mapStateToProps } from '../store/helpers';
import UserLinks from './UserLinks';

const NavBar = ({
  showModal,
  user,
  logout,
  history,
}) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
    <NavLink className="navbar-brand d-flex align-items-center" to="/">
      <img src={logo} alt="StackOverflow Logo" />
      <span className="h3 font-weight-bold  pl-1"> StackOverflow Lite </span>
    </NavLink>
    <button
      className="navbar-toggler"
      type="button"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent"> 
          <NavLink to="/questions" className="nav-link">
            Questions
          </NavLink>
          <UserLinks user={user} logout={() => logout(history)} />
    </div>
  </nav>
);

NavBar.defaultProps = {
  user: null,
};

NavBar.propTypes = {
  showModal: PropTypes.func.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export const mapActionsToProps = dispatch => ({
  showModal: name => dispatch(showAuthModal(name)),
  logout: history => dispatch(logoutUser(history)),
});

export { NavBar };

export default withRouter(
  connect(
    mapStateToProps({ user: 'authentication.user'}),
    mapActionsToProps,
  )(NavBar),
);
