import { useAuth } from "../../base/AuthContext";
import { Avatar, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../../base/routes_data";

const WidgetPF = ({ onClick }) => {
  let auth = useAuth();

  return (
    <>
      <div className="widget-user widget-pf" onClick={onClick}>
        <Link to={`/app/${allRoutesData.pfDados.path}`} className="text-center">
          <Avatar
            alt="Remy Sharp"
            src="https://mui.com/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100, margin: '10px auto 0' }}
          />
          <h3 className="auth-user">
            {auth.user.firstName} {auth.user.lastName}
            <br />
            <small>
              Nome do Cargo do Usuário
            </small>
          </h3>
        </Link>
      </div>
      <div className="complete-seu-perfil">
        <Grid container>
          <Grid item>Perfil:</Grid>
          <Grid item xs>
            <div className="text-right">
              20% completo
            </div>
          </Grid>
        </Grid>
        <div className="hp-bar-bg">
          <div className="hp-bar" style={{ width: '20%' }}></div>
        </div>
        <ul>
          <li>
            <input type="checkbox" checked={true} onChange={() => {}}/>
            <span>Dados Pessoais</span>
          </li>
          <li>
            <input type="checkbox" checked={false} onChange={() => {}}/>
            <span>Experiencia Profissional</span>
          </li>
          <li>
            <input type="checkbox" checked={false} onChange={() => {}}/>
            <span>Graduação</span>
          </li>
          <li>
            <input type="checkbox" checked={false} onChange={() => {}}/>
            <span>Linguagens</span>
          </li>
          <li>
            <input type="checkbox" checked={false} onChange={() => {}}/>
            <span>Projetos</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default WidgetPF