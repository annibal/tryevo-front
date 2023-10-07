import { doCall } from "./baseProvider";
import { useEffect, useState } from "react";

const useFetch = (method, url, params) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    if (url == null) return;
    (async () => {
      let strUrl = url;
      let options = { method };

      if (method === 'GET' || method === 'DELETE') {
        if (params && !url.includes('?')) {
          strUrl += '?' + new URLSearchParams(params).toString()
        }
      } else {
        options.body = JSON.stringify(params)
      }

      setLoading(true);
      setError(null);

      const response = await doCall(strUrl, options);
      
      setLoading(false);
      if (response.success) {
        setData(response.data);
        setMeta(response.meta);
      } else {
        setError(response.error);
      }
    })();
  }, [method, url, params])

  return {
    loading,
    error,
    data,
    meta,
  }
}

export default useFetch;
