import { Navigate, useLocation, useMatches } from "react-router-dom";
import { AUTH_READY_STATE, useAuth } from "../base/AuthContext";
import LoaderTryEvo from "./LoaderTryEvo";

function ProtectedRoute({ children }) {
  let auth = useAuth();
  let location = useLocation();
  const matches = useMatches();
  const currentRouteData = ((matches.reverse().find((x) => x.handle) || {}).handle || {});

  if (auth.readyState !== AUTH_READY_STATE.DONE) {
    return <LoaderTryEvo />
  }

  if (!auth.loading && !auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  if (currentRouteData?.rules?.length > 1) {
    const routeRules = currentRouteData.rules;
    const userFeatures = auth.features;
    const routeAllowed = routeRules.every(rule => userFeatures[rule])
    if (!routeAllowed) {
      console.log('Route not allowed', { currentRouteData, userFeatures });
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
