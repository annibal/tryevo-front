import * as tokenProvider from "./tokenProvider";

export const getApiUrl = (path) => {
  const strPath = (path || "").replace(/^\/*/, "");

  const localApi = ["http", "://", "localhost:3001/api/", strPath].join("");
  // const nodeApi = ["http", "://", "www.tryevo.com.br:21104/api/", strPath].join("")
  const nodeApi = ["https", "://", "tryevo.com.br/api/", strPath].join("")
  // const nodeApi = ["http", "://", "app.tryevo.com.br/proxy.php?proxy_path=", encodeURIComponent(strPath)].join("");

  const isProd = process.env.NODE_ENV === "production"

  const baseUrl = isProd ? nodeApi : localApi;
  return baseUrl;
};

export const doCall = async (path = "", config = {}) => {
  const token = tokenProvider.getToken();

  const requestConfig = {
    url: getApiUrl(path),
    method: "GET",
    ...(config || {}),
  };

  requestConfig.headers = {
    "Content-Type": "application/json",
    ...(config?.headers || {}),
  };
  if (token) {
    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  if (typeof config?.body !== "string") {
    requestConfig.body = JSON.stringify(config.body);
  }

  let response = {
    success: false,
    data: null,
    error: null,
    meta: null,
  };

  try {
    await fetch(requestConfig.url, requestConfig)
      .then(async (r) => {
        response.status = r.status;
        const data = await r.json();

        response.success = data.success;
        response.error = data.error;
        response.data = data.data;

        if (response.data?.data) {
          response = {
            ...response,
            ...response.data,
          };
        }
        if (data?.data?.meta) {
          response.meta = data.data.meta;
          if (response.meta.from != null && response.meta.to != null && response.meta.total != null) {
            const perPage = response.meta.to - response.meta.from;
            response.meta.pages = Math.ceil(response.meta.total / perPage);
            response.meta.page = Math.ceil(response.meta.from / perPage);
            response.meta.perPage = perPage;
          }
        }
      })
      .catch((e) => {
        if (response.status === 404) {
          response.error = `404 Not Found - ${requestConfig.method} "${requestConfig.url}"`;
        } else {
          response.error = e;
        }
      });
  } catch (e) {
    response.error = e;
    console.error(e, e?.stack);
  }
  console.log({ requestConfig, config, response });

  return response;
};
