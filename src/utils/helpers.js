import { API_URL } from './constants';

const base = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
/**
 * Matches full url strings
 * @return {RegexExp}
 */
const isFullUrlRegex = new RegExp('^(http|https)://', 'i');

/**
 * Prepares a aurl
 * @param  {String} url
 * @param  {String|undefined} baseUrl
 * @return {String}
 */
export const prepareUrl = (url, baseUrl = base) => {
  // if the url is absolute, that is it begins with http or https
  // we will return it immediately
  if (isFullUrlRegex.test(url)) return url;

  if (!url) {
    throw new Error('Url is not given');
  }

  let path = url;

  let preparedBase = baseUrl;

  if (!preparedBase.endsWith('/')) {
    preparedBase = `${baseUrl}/`;
  }

  if (path.startsWith('/')) {
    path = path.replace('/', '').trim();
  }
  return `${preparedBase}${path}`;
};

/**
 * Limit a give string to a number of characters
 * @param  {String} string
 * @param  {Number} limit
 * @param  {Stribg} end
 * @return {String}
 */
export const strLimit = (string, limit = 100, end = '...') => {
  const newString = String(string);

  if (newString.length <= limit) return newString;
  return newString.slice(0, limit).trim() + end;
};
