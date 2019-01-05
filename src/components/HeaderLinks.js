import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { showAuthModal, logoutUser } from '../store/actions/authentication';
import logo from '../logo.svg';


const HeaderLinks = ({ showModal, props }) => (
  <React.Fragment>
      <header className="App-header">
        <img src={logo} alt='logo' className="App-logo"/>
        <br/>
        <h1 className="App-title">Welcome to StackOverFlow Lite</h1>
        <Button
        // className="nav-link text-light btn-link"
        onClick={() => showModal('login')}
        data-id="login"
        variant="outlined"
        size="large"
        color="secondary"
      >
        Login
      </Button>
      <Button
        // className="nav-link text-light btn-link"
        onClick={() => showModal('signup')}
        data-id="signup"
        variant="outlined"
        size="large"
        color="primary"
      >
        Register
      </Button>
    </header>
  </React.Fragment>
);

HeaderLinks.propTypes = {
  showModal: PropTypes.func.isRequired,
};

export const mapActionsToProps = dispatch => ({
  showModal: name => dispatch(showAuthModal(name)),
  logout: history => dispatch(logoutUser(history)),
});

export { HeaderLinks };

export default HeaderLinks;
