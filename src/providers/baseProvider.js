import * as tokenProvider from "./tokenProvider";
// import usersJson from '../api-mock/users.json';

export const getApiUrl = (path) => {
  const strPath = (path || '').replace(/^\/*/, '');
  const baseUrl = ['http', '://', 'www.tryevo.com.br:21104/', strPath].join('');
  // const baseUrl = ['http', '://', 'localhost:3001/', strPath].join('');
  return baseUrl;
}

export const doCall = async (path = '', config = {}) => {
  const token = tokenProvider.getToken();

  const requestConfig = {
    url: getApiUrl(path),
    method: 'GET',
    ...(config || {}),
  }

  if (token) {
    requestConfig.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(config?.headers || {})
    }
  }

  if (typeof config?.body !== 'string') {
    requestConfig.body = JSON.stringify(config.body)
  }
  console.log({ requestConfig, config });

  let response = {
    success: false,
    data: null,
    error: null,
  };

  // if (path === 'users.json') {
  //   await new Promise((r) => setTimeout(r, 1000));
  //   response.error = null;
  //   response.success = true;
  //   response.data = usersJson;
  //   return response;
  // }

  try {
    await fetch(requestConfig.url, requestConfig)
      .then(async (r) => {
        response.status = r.status;
        const data = await r.json();
        response.success = true;
        response.data = data;
        if (data.data) {
          response.data = data.data;
        }
        if (response.data.data) {
          response = {
            ...response,
            ...response.data,
          }
        }
      })
      .catch((e) => {
        response.error = e;
      });
  } catch (e) {
    // try {
    //   await fetch(requestConfig)
    //     .then(async (r) => {
    //       response.status = r.status;
    //       const data = await r.text();
    //       response.success = true;
    //       response.data = data;
    //       response.error = null;
    //     })
    //     .catch((e) => {
    //       response.error = e;
    //     });
    // } catch (e) {

    // }

    response.error = e;
    console.error(e, e?.stack);
  }

  return response;
}