import { useAuth } from "../../base/AuthContext";
import { Avatar, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../../base/routes_data";
import stringToColor from "../../utils/stringToColor";

const WidgetPF = ({ onClick }) => {
  let auth = useAuth();

  let subtitulo = "";
  if (auth.user.plano) subtitulo = auth.user.plano;

  let name = auth.user?.email;
  let avatar = name
    .split("@")[0]
    .split(".")
    .slice(0, 2)
    .map((x) => x[0])
    .join("");

  if (auth.userInfo?.nomePrimeiro) {
    name = auth.userInfo.nomePrimeiro;
    subtitulo = auth.user.email;

    if (auth.userInfo.nomeUltimo) name = name + auth.userInfo.nomeUltimo;
    avatar = name
      .split(" ")
      .slice(0, 2)
      .map((x) => x[0])
      .join("");

    if (auth.userInfo?.nomePreferido) {
      name = auth.userInfo.nomePreferido;
    }
    if (auth.userInfo?.nomePreferido.split(' ').length > 1) {
      avatar = name
        .split(" ")
        .slice(0, 2)
        .map((x) => x[0])
        .join("");
    }
  }

  return (
    <>
      <div className="widget-user widget-pf" onClick={onClick}>
        <Link to={`/app/${allRoutesData.pfDados.path}`} className="text-center">
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
            <small>{subtitulo}</small>
          </h3>
        </Link>
      </div>
      <div className="complete-seu-perfil">
        <Grid container>
          <Grid item>Perfil:</Grid>
          <Grid item xs>
            <div className="text-right">20% completo</div>
          </Grid>
        </Grid>
        <div className="hp-bar-bg">
          <div className="hp-bar" style={{ width: "20%" }}></div>
        </div>
        <ul>
          <li>
            <input type="checkbox" checked={true} onChange={() => {}} />
            <span>Dados Pessoais</span>
          </li>
          <li>
            <input type="checkbox" checked={false} onChange={() => {}} />
            <span>Experiencia Profissional</span>
          </li>
          <li>
            <input type="checkbox" checked={false} onChange={() => {}} />
            <span>Graduação</span>
          </li>
          <li>
            <input type="checkbox" checked={false} onChange={() => {}} />
            <span>Linguagens</span>
          </li>
          <li>
            <input type="checkbox" checked={false} onChange={() => {}} />
            <span>Projetos</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default WidgetPF;
