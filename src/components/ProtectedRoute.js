import { Navigate, useLocation } from "react-router-dom";
import { AUTH_READY_STATE, useAuth } from "../base/AuthContext";
import LoaderTryEvo from "./LoaderTryEvo";

function ProtectedRoute({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.readyState !== AUTH_READY_STATE.DONE) {
    return <LoaderTryEvo />
  }

  if (!auth.loading && !auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
