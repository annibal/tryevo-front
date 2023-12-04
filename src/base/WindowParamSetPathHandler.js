import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const WindowParamSetPathHandler = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const paramSetPath = searchParams.get("set-path");

  useEffect(() => {
    if (paramSetPath) {
      console.log("paramSetPath", paramSetPath);
      searchParams.delete("set-path");
      let strSearchParams = searchParams.toString();
      if (strSearchParams) strSearchParams = `?${strSearchParams}`;
      const settedPath = `${paramSetPath}${strSearchParams}`;

      setTimeout(() => {
        nav(settedPath, { replace: true });
      }, 150)
    }
  }, [paramSetPath]);

  return "";
};

export default WindowParamSetPathHandler;
