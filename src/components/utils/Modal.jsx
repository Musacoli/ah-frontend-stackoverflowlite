import jQuery from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/js/dist/modal';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.setReference = this.setReference.bind(this);
    this.modalRef = null;
  }

  componentDidMount() {
    const { onHide, onShow, show } = this.props;
    this.$el.on('hidden.bs.modal', onHide);
    this.$el.on('show.bs.modal', onShow);

    if (show) {
      this.$el.modal('show');
    }
  }

  componentWillReceiveProps({ show }) {
    if (show) {
      this.$el.modal('show');
      return;
    }
    this.$el.modal('hide');
  }

  componentWillUnmount() {
    // remove the event listeners to avoid memory leakages
    this.$el.off('hidden.bs.modal');
    this.$el.off('show.bs.modal');
    this.$el.modal('dispose');
  }

  setReference(el) {
    this.$el = jQuery(el);
  }

  render() {
    const { title, children, size } = this.props;

    const sizeClass = { small: 'modal-sm', medium: 'modal-md', large: 'modal-lg' }[size];

    return (
      <div
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        ref={this.setReference}
      >
        <div className={`modal-dialog modal-dialog-centered ${sizeClass}`} role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close text-white"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  onShow: () => {},
  onHide: () => {},
  size: 'medium',
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  children: PropTypes.any.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
export default Modal;
