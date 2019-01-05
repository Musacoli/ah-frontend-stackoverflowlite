import { prepareUrl } from './helpers';

/**
 * A wrapper around the Fetch API
 */
class Http {
  /**
   * Creates an instance of the http class
   * @param  {String} baseUrl
   * @return {Http}
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    this.headers = {
      'content-type': 'application/json',
    };
    this.registerHooks();
    this.onSucess = this.onSucess.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
    this.afterRequest = this.afterRequest.bind(this);
    this.token = null;
    this.requiresAuthentication = false;
  }

  /**
   * Sets the authentication token
   * @param {String|null} token
   * @param {String} prefix
   */
  setToken(token = null, prefix = 'Bearer') {
    if (token) {
      this.token = `${prefix} ${token}`;
    }
    return this;
  }

  /**
   * clears the authentication token
   */
  clearToken() {
    this.token = null;
    this.requiresAuthentication = false;

    return this;
  }

  /**
   * Adds the authentication Header for the next request
   * @param  {String|null} token
   * @param  {String} prefix
   * @return {Http}
   */
  withAuthentication(token = null, prefix = 'Bearer') {
    this.requiresAuthentication = true;
    return this.setToken(token, prefix);
  }

  /**
   * After every request callback
   */
  afterRequest() {
    this.fireHook('onFinished');
    // turn off the requires authentication if the developer had turned it own before
    // the request so that it doesnot affect next requests
    this.requiresAuthentication = false;
  }

  /**
   * Hook into the request cycle
   */
  registerHooks() {
    this.hooks = {
      onStart: [],
      onPass: [],
      onFinished: [],
      onFail: [],
    };

    Object.keys(this.hooks).forEach(hook => {
      this[hook] = callbak => this.hooks[hook].push(callbak);
    });
  }

  /**
   * Makes a get request
   * @param  {String} url
   * @return {Promise}
   */
  get(url) {
    return this.makeRequest(url, 'GET');
  }

  /**
   * Makes a post Request
   * @param  {String} url
   * @param  {Object} data
   * @return {Promise}
   */
  post(url, data) {
    return this.makeRequest(url, 'POST', data);
  }

  /**
   * Makes a put request
   * @param  {String} url
   * @param  {Object} data
   * @return {Promise}
   */
  put(url, data) {
    return this.makeRequest(url, 'PUT', data);
  }

  /**
   * Makes a Patch request
   * @param  {String} url
   * @param  {Object} data
   * @return {Promise}
   */
  patch(url, data) {
    return this.makeRequest(url, 'PATCH', data);
  }

  /**
   * Makes a Patch delete
   * @param  {String} url
   * @param  {Object} data
   * @return {Promise}
   */
  delete(url, data) {
    return this.makeRequest(url, 'DELETE', data);
  }

  /**
   * Makes request options based on the state of this instance
   * @return {Object}
   */
  makeOptions(method, data) {
    const { headers } = this;

    // if the user specifies withAuthentication, we will add the authentication Header
    if (this.requiresAuthentication) {
      headers.Authorization = this.token;
    }

    const options = {
      method,
      headers,
      mode: 'cors',
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return options;
  }

  /**
   * Makes an Http Request
   * @param  {String} url
   * @param  {String} method
   * @param  {Object} data
   * @return {Promise}
   */
  makeRequest(url, method, data = null) {
    this.fireHook('onStart');
    return window
      .fetch(prepareUrl(url), this.makeOptions(method, data))
      .then(this.onSucess)
      .catch(this.handleFailure)
      .finally(this.afterRequest);
  }

  /**
   * Fires a given hook
   * @param  {String}    name
   * @param  {Array|null} args
   */
  fireHook(name, ...args) {
    this.hooks[name].forEach(hook => hook(...args));
  }

  /**
   * Checks to see if a response was okay
   * @param  {Response} response
   * @return {Promise}
   */
  onSucess(response) {
    return Http.convertResponse(response).then(data => {
      if (response.ok) {
        this.fireHook('onPass', data);
        return Promise.resolve(data);
      }
      /* istanbul ignore next */
      return this.handleFailure(data);
    });
  }

  /**
   * Handle a failed fetch request
   * @param  {Object|Error|String} error
   * @return {Promise}
   */
  handleFailure(error) {
    this.fireHook('onFail', error);
    return Promise.reject(error);
  }

  /**
   * Converts a given response based on its content-type
   * @param  {Response} response
   * @return {Promise}
   */
  static convertResponse(response) {
    const contentType = response.headers.get('content-type').toLowerCase();

    if (contentType.includes('json')) {
      return response.json();
    }
    if (contentType.includes('html')) {
      return response.text();
    }
    return Promise.reject(new Error(`Content-type: ${contentType} is not supported`));
  }
}

export default Http;
