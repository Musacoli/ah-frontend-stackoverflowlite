import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Modal from './Modal';

describe('Modal tests', () => {
  test('it calls component did mount ', () => {
    sinon.spy(Modal.prototype, 'componentDidMount');

    mount(
      <Modal show title="Some modal title">
        Some modal content
      </Modal>,
    );
    expect(Modal.prototype.componentDidMount).toHaveProperty('callCount', 1);
  });

  test('it does not crash when show is false ', () => {
    mount(
      <Modal show={false} title="Some modal title">
        Some modal content
      </Modal>,
    );
  });

  test('it triggers the onShow call back', () => {
    const onShow = jest.fn();
    const wrapper = mount(
      <Modal show title="Some modal title" onShow={onShow}>
        Some modal content
      </Modal>,
    );

    wrapper.setProps({ show: true });
    expect(onShow).toHaveBeenCalled();
  });

  test('it triggers the onHide call back', () => {
    const onHide = jest.fn();
    const wrapper = mount(
      <Modal show title="Some modal title" onShow={onHide}>
        Some modal content
      </Modal>,
    );

    wrapper.setProps({ show: false });
    expect(onHide).toHaveBeenCalled();
  });

  test('it calls component did unmount ', () => {
    sinon.spy(Modal.prototype, 'componentWillUnmount');

    const wrapper = mount(
      <Modal show title="Some modal title">
        Some modal content
      </Modal>,
    );

    wrapper.unmount();
    expect(Modal.prototype.componentWillUnmount).toHaveProperty('callCount', 1);
  });

  test('it sets the modal size ', () => {
    const wrapper = mount(
      <Modal show title="Some modal title" size="small">
        Some modal content
      </Modal>,
    );

    expect(wrapper.find('.modal-dialog.modal-dialog-centered.modal-sm')).toHaveLength(1);
  });
});
