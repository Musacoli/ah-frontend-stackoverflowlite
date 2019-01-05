import React from 'react';
import { mount, shallow } from 'enzyme';
import { FormComponent, mapActionsToProps } from './FormComponent';
import Input from './Input';

const defaultProps = {
  register: () => {},
  updateFormValue: () => {},
  defaultFormSubmitter: () => {},
  updateFormErrors: () => {},
  resetFormData: () => {},
  button: 'Save',
  name: 'my-form',
  forms: {},
  children: [],
};

const updateProps = props => Object.assign(defaultProps, props);

const mountedForm = props =>
  mount(
    <FormComponent {...updateProps(props)}>
      <Input name="email" />
    </FormComponent>,
  );

describe('FormComponent', () => {
  test('It calls the register method when mounted', () => {
    const callback = jest.fn();
    mount(<FormComponent {...updateProps({ register: callback })}>Form children</FormComponent>);

    expect(callback).toHaveBeenCalled();
  });

  test('getFormData returns the current data in the forms', () => {
    const data = { name: 'Ahimbisibwe Roland', email: 'roland@example.com' };
    const forms = { 'my-form': { data } };
    const wrapper = shallow(<FormComponent {...updateProps({ forms })} />);

    expect(wrapper.instance().getFormData()).toEqual(data);
  });

  test('getFormErrors returns the current form errors', () => {
    const errors = { name: ['name is required'] };
    const forms = { 'my-form': { errors } };
    const wrapper = shallow(<FormComponent {...updateProps({ forms })} />);

    expect(wrapper.instance().getFormErrors()).toEqual({ errors });
  });

  test('it updates form errors', () => {
    const onError = jest.fn();
    const updateFormErrors = jest.fn();

    const wrapper = shallow(
      <FormComponent
        {...updateProps({
          onError,
          updateFormErrors,
        })}
      />,
    );
    wrapper.instance().updateErrors({});

    expect(onError).toHaveBeenCalled();
    expect(updateFormErrors).toHaveBeenCalled();
  });

  test('handleSubmit is triggered with form data', () => {
    const handleSubmit = jest.fn();
    const data = { email: 'john@example.com' };

    const wrapper = mountedForm({
      handleSubmit,
      forms: { 'my-form': { data } },
    });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(handleSubmit.mock.calls[0][0]).toEqual(data);
  });

  test('beforeSubmit is triggered with the form data', () => {
    const beforeSubmit = jest.fn();
    const data = { email: 'john@example.com' };

    const wrapper = mountedForm({
      handleSubmit: null,
      forms: { 'my-form': { data } },
      beforeSubmit,
    });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(beforeSubmit.mock.calls[0][0]).toEqual(data);
  });

  test('it triggers the component form action ', () => {
    const defaultFormSubmitter = jest.fn(data => data);
    defaultFormSubmitter.mockResolvedValue({});
    const data = { email: 'john@example.com' };

    const wrapper = mountedForm({
      handleSubmit: null,
      forms: { 'my-form': { data } },
      beforeSubmit: response => response,
      action: 'some-action',
      defaultFormSubmitter,
      successSubmit: () => {},
    });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(defaultFormSubmitter).toHaveBeenCalled();
  });

  test('It dispatches all form actions', () => {
    const dispatch = jest.fn();
    const actions = mapActionsToProps(dispatch);

    Object.keys(actions).forEach(action => actions[action]({}));

    expect(dispatch).toHaveBeenCalledTimes(Object.keys(actions).length);
  });

  test('It renders a callback button', () => {
    const callback = jest.fn();

    mountedForm({ button: callback });

    expect(callback).toHaveBeenCalled();
  });

  test('default beforeSubmit returns the given data', () => {
    const data = { name: 'roland' };

    expect(FormComponent.defaultProps.beforeSubmit(data)).toEqual(data);
  });

  test('It renders generic errors', () => {
    const wrapper = mountedForm({
      forms: { 'login-form': { errors: { error: ['Hello world'] } } },
      name: 'login-form',
      nonInputErrorFields: ['error'],
    });

    expect(wrapper.find('.bg-danger')).toHaveLength(1);
  });
});

describe('Input', () => {
  test('It calls the handleChange provided by the form', () => {
    const callback = jest.fn();
    const wrapper = mountedForm({ updateFormValue: callback });

    wrapper.find('input').simulate('change', { target: { name: 'email', value: 20 } });

    expect(callback).toHaveBeenCalled();
  });
});
