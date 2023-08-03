import * as tokenProvider from "./tokenProvider";

export const getApiUrl = (path) => {
  const strPath = (path || "").replace(/^\/*/, "");

  const baseUrl = process.env.NODE_ENV === "production"
    ? ["http", "://", "www.tryevo.com.br:21104/", strPath].join("")
    : ["http", "://", "localhost:3001/", strPath].join("");
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
  console.log({ requestConfig, config });

  let response = {
    success: false,
    data: null,
    error: null,
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
      })
      .catch((e) => {
        response.error = e;
      });
  } catch (e) {
    response.error = e;
    console.error(e, e?.stack);
  }

  return response;
};
