import { Navigate, useLocation } from "react-router-dom";

const Redirect = ({ to }) => {
  const location = useLocation();

  if (location.pathname !== to) {
    return (
      <Navigate to={to} replace={true} />
    )
  }
  return null;
}

export default Redirect;
