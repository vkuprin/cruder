import config from '../../config';

const HOST = 'https://deployed-vitaly-dev.com';

const getUserAgent = () => `Kuprins-${navigator.userAgent}`;

const headersData = {
  'X-edge-agent': getUserAgent(),
  'content-type': 'application/json',
  'x-api-key': config.apiKey,
};

const getHeaders = (token: string | null) => ({
  ...headersData,
  Authorization: `Bearer ${token}`,
});

export const responseParser = async (response: { json: () => any; }) => {
  let result;
  try {
    result = await response.json();
  } catch {
    result = response;
  }
  return result;
};

export const checkStatus = (response: any) => {
  if (response) {
    return response;
  }
  throw new Error(response.statusText);
};

const errorParser = async (err: any) => {
  console.error(err);
  if (!window.navigator.onLine) {
    throw new Error('No internet connection');
  }

  if (!err || !err.response) {
    return Promise.reject(new Error(err || err.response));
  }

  const errorResponse = await responseParser(err.response);
  const error = { msg: errorResponse, status: err.response.status };
  return Promise.reject(error);
};

const generateURL = <T>(path: any, queryParams: { [p: string]: T }) => {
  // Keep param with falsy value as a number, e. g. start = 0
  const filteredParams: any = Object.entries(queryParams).filter((param) => typeof queryParams[param[0]] === 'number' || queryParams[param[0]]);
  const query = new URLSearchParams(Object.fromEntries(filteredParams));

  return `${path}?${query.toString()}`;
};

const getQueryParams = (queryString: string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined, paramNames: any[]) => {
  const params = new URLSearchParams(queryString);
  const result = {} as any;

  paramNames.forEach((paramName) => {
    result[paramName] = params.get(paramName);
  });

  return result;
};

const getApiData = async (path: string, token: string | null) => {
  const header = { headers: getHeaders(token) };
  const url = `${HOST}${path}`;

  return fetch(url, header)
    .then(checkStatus)
    .then(responseParser)
    .catch(errorParser);
};

const postApiData = async (path: string, body: object, token: string | null) => {
  const url = `${HOST}${path}`;

  return fetch(url, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .then(responseParser)
    .catch(errorParser);
};

const deleteApiData = async (path: string, token: string | null) => {
  const url = `${HOST}${path}`;

  return fetch(url, {
    method: 'DELETE',
    headers: getHeaders(token),
  })
    .then(checkStatus)
    .then(responseParser)
    .catch(errorParser);
};

const putApiData = async (path: string, body: object, token: string | null) => {
  const url = `${HOST}${path}`;

  return fetch(url, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .then(responseParser)
    .catch(errorParser);
};

export {
  HOST,
  headersData,
  getHeaders,
  getApiData,
  putApiData,
  postApiData,
  generateURL,
  getQueryParams,
  deleteApiData,
};
