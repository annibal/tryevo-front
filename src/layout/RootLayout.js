import { Outlet, useMatches } from "react-router-dom";
import "../style/index.css";
import "../style/loader-try-evo.css";
import { Helmet } from "react-helmet";

const RootLayout = () => {
  const matches = useMatches();
  const currentRouteData = ((matches.reverse().find((x) => x.handle) || {}).handle || {});

  const title = currentRouteData?.title
    ? `${currentRouteData?.title} - TryEvo`
    : "TryEvo";

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Outlet />
    </>
  );
};

export default RootLayout;
