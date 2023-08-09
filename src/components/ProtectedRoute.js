import { Navigate, useLocation, useMatches } from "react-router-dom";
import { ACCOUNT_FEATURES, AUTH_READY_STATE, useAuth } from "../base/AuthContext";
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
    const userFeatures = {...auth.features};
    userFeatures[ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR] = true;
    let routeAllowed = routeRules.every(rule => userFeatures[rule])
    
    if (userFeatures[ACCOUNT_FEATURES.MASTER_ADMIN]) {
      routeAllowed = true;
    }

    if (!routeAllowed) {
      console.log('Route not allowed', { currentRouteData, userFeatures });
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
