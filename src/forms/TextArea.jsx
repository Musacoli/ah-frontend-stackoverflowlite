import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autosize from 'autosize';
import { BaseInput } from './BaseInput';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.refsTextArea = React.createRef();
  }

  componentDidMount() {
    autosize(this.refsTextArea.current);
  }

  render() {
    return (
      <BaseInput
        {...this.props}
        renderInput={(locals, data, handleChange, hasError) => (
          <textarea
            {...locals}
            ref={this.refsTextArea}
            onChange={e => handleChange(locals.name, e.currentTarget.value)}
            className={classNames(locals.className, { 'is-invalid': hasError })}
            value={data[locals.name] || ''}
          />
        )}
      />
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
};

TextArea.displayName = 'TextArea';

export default TextArea;
