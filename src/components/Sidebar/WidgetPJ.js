import { AUTH_READY_STATE, useAuth } from "../../base/AuthContext";
import { Avatar, Grid } from "@mui/material";
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

  const userInfo = auth.userInfo || {};

  let completeness = {
    'Dados Pessoais': !!userInfo.nomeResponsavel && !!userInfo.nomeFantasia && !!userInfo.razaoSocial,
    'Telefone': userInfo.telefones?.length > 0,
    'Redes Sociais': userInfo.links?.length > 0,
    'CNPJ': userInfo.cnpj?.length > 1,
    'Inscrição Estadual': userInfo.inscricaoEstadual?.length > 1,
    'Endereço': userInfo.endereco && !!userInfo.endereco.cep && !!userInfo.endereco.numero,
    // Projetos
    // Qualificações
    // Testes
  }
  completeness = Object.entries(completeness)
  const completePercent = Math.ceil(completeness.filter(x => x[1]).length / completeness.length * 100);

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
      <div className="complete-seu-perfil">
        <Grid container>
          <Grid item>Empresa:&nbsp;</Grid>
          <Grid item xs>
            <div className="text-right">{completePercent}% completa</div>
          </Grid>
        </Grid>
        <div className="hp-bar-bg">
          <div className="hp-bar" style={{ width: `${completePercent}%` }}></div>
        </div>
        <ul>
        {completeness.map(([name, checked]) => (
          <li key={name}>
            <input type="checkbox" checked={checked} onChange={() => {}} />
            <span>{name}</span>
          </li>
        ))}
        </ul>
      </div>
    </>
  );
};

export default WidgetPJ;