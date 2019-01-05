class FormErrors {
  /**
   * Creates an instance of this class
   * @param  {Object} errors
   * @return {self}
   */
  constructor(errors = {}) {
    this.errors = errors;
  }

  /**
   * Updates the existing errors
   * @param  {Object} errors
   * @return {self}
   */
  update(errors = {}) {
    this.errors = errors;
    return this;
  }

  /**
   * Determines if errros has a given name
   * @param  {String}  name
   * @return {Boolean}
   */
  has(name) {
    return !!(Object.prototype.hasOwnProperty.call(this.errors, name) && this.errors[name]);
  }

  /**
   * Extracts the first error of an input field
   * @param  {String} name
   * @return {String|null}
   */
  first(name) {
    return this.has(name) ? this.all(name)[0] : null;
  }

  /**
   * Gets all the errors of an input field
   * @param  {String} name
   * @return {Array}
   */
  all(name) {
    return this.errors[name];
  }
}

export default FormErrors;
