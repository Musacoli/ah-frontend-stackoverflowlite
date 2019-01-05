import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BaseInput } from './BaseInput';

const Input = props => (
  <BaseInput
    {...props}
    renderInput={(locals, data, handleChange, hasError) => (
      <input
        {...locals}
        onChange={e => handleChange(locals.name, e.currentTarget.value)}
        className={classNames(locals.className || '', { 'is-invalid': hasError })}
        value={data[locals.name] || ''}
      />
    )}
  />
);

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
  name: PropTypes.string.isRequired,
};

Input.displayName = 'Input';

export default Input;
