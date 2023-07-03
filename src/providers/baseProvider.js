import * as tokenProvider from "./tokenProvider";
import usersJson from '../api-mock/users.json';

export const getApiUrl = (path) => {
  const strPath = (path || '').replace(/^\/*/, '');
  const baseUrl = ['http', '://', 'app.tryevo.com.br/api-mock/', strPath].join('');
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
  

  if (path === 'users.json') {
    await new Promise((r) => setTimeout(r, 1000));
    response.error = null;
    response.success = true;
    response.data = usersJson;
    return response;
  }


  try {
    await fetch(requestConfig.url, requestConfig)
      .then(async (r) => {
        response.status = r.status;
        const data = await r.json();
        response.success = true;
        response.data = data;
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