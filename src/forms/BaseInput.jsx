import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { pickBy } from 'lodash';

/**
 * The reserved props that shouldn't be passed to the rendered input
 * @type {Array}
 */
const RESERVED_PROPS = [
  'label',
  'data',
  'renderInput',
  'handleChange',
  'errors',
  'showsErrors',
  'inputClass',
];

const BaseInput = props => {
  const { label, renderInput, handleChange, errors, showsErrors, name, data } = props;
  const hasError = showsErrors && errors.has(name);
  const locals = pickBy(props, (value, key) => !RESERVED_PROPS.includes(key));

  return (
    <div className={classNames('form-group', { 'has-error': hasError })}>
      {label && <label> {label} </label>}
      {renderInput(locals, data, handleChange, hasError)}
      {hasError && <div className="text-danger text-sm">{errors.first(name)}</div>}
    </div>
  );
};

BaseInput.defaultProps = {
  showsErrors: true,
  label: null,
  data: {},
  className: 'form-control',
};

BaseInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  renderInput: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  showsErrors: PropTypes.bool,
  data: PropTypes.object,
  /* eslint-disable react/no-unused-prop-types */
  className: PropTypes.string,
};

BaseInput.displayName = 'BaseInput';

export { BaseInput };

export default BaseInput;
