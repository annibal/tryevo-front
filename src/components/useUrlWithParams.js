import { useState } from "react";

export default function useUrlWithParams(baseUrl, defaultParams = {}) {
  const [searchParams, setSearchParams] = useState(defaultParams);

  const setSearchParamsPart = (part) => {
    setSearchParams({ ...searchParams, ...part });
  };

  const sp = Object.fromEntries(
    Object.entries(searchParams).filter(
      ([key, value]) => value !== null && value !== undefined
    )
  );
  const query = new URLSearchParams(sp).toString();
  const url = `${baseUrl}?${query}`;

  return [searchParams, setSearchParamsPart, url];
}
