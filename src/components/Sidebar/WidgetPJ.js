import { AUTH_READY_STATE, useAuth } from "../../base/AuthContext";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../../base/routes_data";
import stringToColor from "../../utils/stringToColor";

const WidgetPJ = ({ onClick }) => {
  let auth = useAuth();
  if (auth.readyState !== AUTH_READY_STATE.DONE) return '';

  let subtitulo = "";
  if (auth.user?.plano) subtitulo = auth.user.plano;

  let name = auth.user?.email;
  let avatar = name
    .split("@")[0]
    .split(".")
    .slice(0, 2)
    .map((x) => x[0])
    .join("");

  if (auth.userInfo?.nomeResponsavel || auth.userInfo?.nomeFantasia || auth.userInfo?.razaoSocial) {
    subtitulo = auth.user.email;
    name = auth.userInfo.nomeResponsavel;
    
    if (auth.userInfo?.nomeFantasia) name = auth.userInfo.nomeFantasia;
    if (auth.userInfo?.razaoSocial) name = auth.userInfo.razaoSocial;
    
    avatar = name
      .split(" ")
      .slice(0, 2)
      .map((x) => x[0])
      .join("");
  }

  return (
    <>
      <div className="widget-user widget-pj" onClick={onClick}>
        <Link to={`/app/${allRoutesData.pjDados.path}`} className="text-center">
          <Avatar
            sx={{
              width: 50,
              height: 50,
              margin: "10px auto 0",
              bgcolor: stringToColor(name),
            }}
          >
            {avatar.toUpperCase()}
          </Avatar>
          <h3 className="auth-user">
            {name}
            <br />
            <small>
              {subtitulo}
            </small>
          </h3>
        </Link>
      </div>
    </>
  );
};

export default WidgetPJ;