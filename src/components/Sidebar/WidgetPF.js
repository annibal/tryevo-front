import { AUTH_READY_STATE, useAuth } from "../../base/AuthContext";
import { Avatar, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../../base/routes_data";
import stringToColor from "../../utils/stringToColor";

const WidgetPF = ({ onClick }) => {
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

  if (auth.userInfo?.nomePrimeiro) {
    name = auth.userInfo.nomePrimeiro;
    subtitulo = auth.user.email;

    if (auth.userInfo.nomeUltimo) name = name + ' ' + auth.userInfo.nomeUltimo;
    avatar = name
      .split(" ")
      .slice(0, 2)
      .map((x) => x[0])
      .join("");

    if (auth.userInfo?.nomePreferido) {
      name = auth.userInfo.nomePreferido;
    }
    if ((auth.userInfo?.nomePreferido || '').split(' ').length > 1) {
      avatar = name
        .split(" ")
        .slice(0, 2)
        .map((x) => x[0])
        .join("");
    }
  }

  const userInfo = auth.userInfo || {};

  let completeness = {
    'Dados Pessoais': !!userInfo.nomePrimeiro && !!userInfo.nomeUltimo && !!userInfo.nascimento && !!userInfo.genero,
    'Telefone': userInfo.telefones?.length > 0,
    'Documentos': userInfo.documentos?.length > 1 && userInfo.documentos.find(doc => doc.tipo === 'CPF'),
    'Endereço': userInfo.endereco && !!userInfo.endereco.cep && !!userInfo.endereco.numero,
    'Idiomas': userInfo.linguagens?.length > 0 && !!userInfo.linguagens[0],
    'Graduação': userInfo.escolaridades?.length > 0 && !!userInfo.escolaridades[0],
    'Empregos': userInfo.experienciasProfissionais?.length > 0 && !!userInfo.experienciasProfissionais[0],
    // Projetos
    // Qualificações
    // Testes
  }
  completeness = Object.entries(completeness)
  const completePercent = Math.ceil(completeness.filter(x => x[1]).length / completeness.length * 100);

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
            <div className="text-right">{completePercent}% completo</div>
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

export default WidgetPF;
