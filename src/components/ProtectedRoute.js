import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../base/AuthContext";

function ProtectedRoute({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.loading && !auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
