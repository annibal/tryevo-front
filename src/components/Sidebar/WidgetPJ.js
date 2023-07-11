import { useAuth } from "../../base/AuthContext";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../../base/routes_data";

const WidgetPJ = ({ onClick }) => {
  let auth = useAuth();

  return (
    <>
      <div className="widget-user widget-pj" onClick={onClick}>
        <Link to={`/app/${allRoutesData.pjDados.path}`} className="text-center">
          <Avatar
            alt="Remy Sharp"
            src="https://mui.com/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100, margin: '10px auto 0' }}
          />
          <h3 className="auth-user">
            {auth.user.firstName} {auth.user.lastName}
            <br />
            <small>
              Razão Social da Empresa
            </small>
          </h3>
        </Link>
      </div>
    </>
  );
};

export default WidgetPJ;