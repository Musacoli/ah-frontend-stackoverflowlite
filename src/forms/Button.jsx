import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = props => {
  const { text, children, className, type, renderIcon } = props;

  return (
    <button type={type} className={classNames('btn', className)}>
      {renderIcon()}
      {children || text}
    </button>
  );
};

Button.defaultProps = {
  className: 'btn-primary',
  children: null,
  renderIcon: () => null,
  type: 'submit',
  text: null,
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  renderIcon: PropTypes.func,
  children: PropTypes.string,
  text: PropTypes.string,
};

export default Button;
