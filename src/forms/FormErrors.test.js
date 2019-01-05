import FormErrors from './FormErrors';

describe('Form Errors', () => {
  test('it initializes errors with {} if no errors are given', () => {
    const errors = new FormErrors();

    expect(errors.errors).toEqual({});
  });

  test('it updates the existing errors', () => {
    const errors = new FormErrors();
    const newErrors = { name: ['field is required'] };

    errors.update(newErrors);

    expect(errors.errors).toEqual(newErrors);
  });

  test('empty update defaults to {}', () => {
    const errors = new FormErrors();

    errors.update();

    expect(errors.errors).toEqual({});
  });

  test('it determines if error has a field', () => {
    const errors = new FormErrors({ name: [] });

    expect(errors.has('name')).toBeTruthy();
  });

  test("has returns false if field doesn't exists", () => {
    const errors = new FormErrors({ age: [] });

    expect(errors.has('name')).toBeFalsy();
  });

  test('it returns the first error of a field', () => {
    const ageError = 'The age field is required';
    const errors = new FormErrors({ age: [ageError, 'Some other age error'] });

    expect(errors.first('age')).toEqual(ageError);
  });

  test("first returns null if the field doesn't exist", () => {
    const errors = new FormErrors();

    expect(errors.first('age')).toEqual(null);
  });

  test('It returns all errors of a given field', () => {
    const nameErrors = ['Name is required', 'Name should be at-least 3 characters'];
    const errors = new FormErrors({ name: nameErrors, age: ['Some age error'] });

    expect(errors.all('name')).toEqual(nameErrors);
  });
});
