import { useEffect } from "react";
import { useAuth } from "../base/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.signout(() => {
      navigate('/');
    })
  }, [auth, navigate])

  return (
    <h2>
      Saindo...
    </h2>
  );
}

export default LogoutPage;
