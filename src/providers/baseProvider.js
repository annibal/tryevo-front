import * as tokenProvider from "./tokenProvider";

export const getApiUrl = (path) => {
  const strPath = (path || "").replace(/^\/*/, "");

  const localApi = ["http", "://", "localhost:3001/api/", strPath].join("");
  // const nodeApi = ["http", "://", "www.tryevo.com.br:21104/api/", strPath].join("")
  const nodeApi = ["https", "://", "tryevo.com.br/api/", strPath].join("");
  // const nodeApi = ["http", "://", "app.tryevo.com.br/proxy.php?proxy_path=", encodeURIComponent(strPath)].join("");

  const isProd = process.env.NODE_ENV === "production";

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

  const dt = +new Date();
  const decachedUrl = requestConfig.url.includes("?")
    ? `${requestConfig.url}&uncache=${dt}`
    : `${requestConfig.url}?uncache=${dt}`;

  try {
    await fetch(decachedUrl, requestConfig)
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
          if (
            response.meta.from != null &&
            response.meta.to != null &&
            response.meta.total != null
          ) {
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

export const getPagBankPublicKey = () =>
  /* old:
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx457qzLMsOa0g2WNrAWmm4OEBIoGiTjZAgZByx7cvvlgPKF49jhXq4tZ+mVGGvtzMHtsbRP7Q35L9y67wo4l7mK/KsXzBq7zSvXz9kzfKkUMewQ/ykdMhwOEoK5endMK/QWesARS5aPhXc0lCXlb9wiCUmogjjhCiKp1FzF8ZKaLSkhH08hoegYsLksVOpzHS3hhTYn5L6LmO1yU6mBgKha9eqDLcIyvuqQjatN0rci+OrV6tZgAiJEYGGp7RPGlaw5vTdbdcmzvUc3SUsUioVFJfkyNdwHUXQEUazj0KhdPO91IKBqR/2WVC9r8g/JHZjsHiF+PQClPWbCSERqy5QIDAQAB";
     new: */
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlnMkoQEth4aRi0LTsJlC6oSV/zShUFWWXCcjguyt7nKr67myUU0HPbwoyQ1nSblygCiUMw1jlYBTGkVMM9nv7GLIi0MsJw66piCYzkvtM6AatS5u0isgOd3hX2LY7OJ6vbEGlt1BM+EdkynZontOvIfEdCimzfcq/BQuxn4DNxast37LNiMoqWKTz6c5EyrRc0zUpzSGET1XiwKw9DgYJots4PFo17QlnPT5Vge7QGOqidUEseUiHXLC2zrpImEZ5yyCZdLnI5q7baVzFOMkqCjGiRhhyr8hQ4mlLmB7WcqujEEyYDZeJQI4E0Vj8MC1M6YEZPX1XEegkpd2dMd9BQIDAQAB";

//
export const getPagBankSandboxPublicKey = () =>
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB";
