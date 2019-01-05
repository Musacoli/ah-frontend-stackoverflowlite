import React from 'react';
import { mount } from 'enzyme';
import TextArea from './TextArea';
import FormErrors from './FormErrors';

describe('TextArea', () => {
  test('It handles triggers the handleChange Event', () => {
    const handleChange = jest.fn();
    const errors = new FormErrors({});
    const wrapper = mount(
      <TextArea handleChange={handleChange} errors={errors} data={{}} name="tags" />,
    );

    wrapper.find('textarea').simulate('change', { value: 'me' });
    expect(handleChange).toHaveBeenCalled();
  });
});
