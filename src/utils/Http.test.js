import Http from './Http';
import { API_URL } from './constants';
import { prepareUrl } from './helpers';

let http;

const makeResponse = (body = [], status = 200) => ({
  status,
  body,
  headers: {
    'content-type': 'application/json',
  },
});

describe('Http tests', () => {
  beforeEach(() => {
    http = new Http(API_URL);
    fetch.restore();
  });

  test('It makes all http verbs without failing', () => {
    const data = { name: 'krmorland' };
    fetch.mock(prepareUrl('some-url'), makeResponse(data));
    expect(() => {
      ['get', 'put', 'patch', 'post', 'delete'].forEach(verb => {
        http[verb]('some-url').catch(error => {
          throw new Error(error);
        });
      });
    }).not.toThrow();
  });
  test('It coverts responses with content type  html', () => {
    fetch.post(prepareUrl('some-url'), {
      headers: { 'content-type': 'text/html' },
      body: 'Hello world',
    });
    http.post('some-url').then(data => expect(data).toEqual('Hello world'));
  });

  test('It throws an error for unsupported content types ', () => {
    fetch.post(prepareUrl('some-url'), {
      headers: { 'content-type': 'unknown-content-type' },
    });

    http.post('some-url').catch(error => {
      expect(error.message).toEqual(`Content-type: unknown-content-type is not supported`);
    });
  });

  test('it clears the token', () => {
    http.setToken('some-token');
    http.clearToken();
    expect(http.token).toEqual(null);
  });

  test('test with authentication sets token ', () => {
    fetch.post(prepareUrl('some-url'), makeResponse());

    http
      .withAuthentication('some-token')
      .post('some-url')
      .then(() => {
        expect(http.requiresAuthentication).toBeTruthy();
      });
  });

  test('withAuthentication can be called with no parameter', () => {
    http.withAuthentication();
    expect(http.requiresAuthentication).toBeTruthy();
  });
});
