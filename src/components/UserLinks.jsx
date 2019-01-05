import React from 'react';
import PropTypes from 'prop-types';
import defaultUserImage from '../user.png';
import { NavLink } from 'react-router-dom';

const UserLinks = ({ user, logout }) => (
  <React.Fragment>
    <li className="nav-item d-flex align-items-center justify-content-between">
      <div className="bg-white  rounded rounded-circle">
        <img src={defaultUserImage} alt={user.username} className="user-avatar" />
      </div>
      <NavLink className="text-white ml-2" to='/'>
        {user.username}
      </NavLink>
    </li>
    <li className="nav-item">
      <button className="nav-link text-light btn-link" onClick={logout}>
        Logout
      </button>
    </li>
  </React.Fragment>
);

UserLinks.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserLinks;
