import { Link } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";

const vagasData = [
  'Analista de Sistemas',
  'Programador Web',
  'Vendedor de Coxinha',
]

const MinhasVagasPage = () => {
  return (
    <div>
      <h2>Minhas Vagas</h2>
      <p>- Em construção -</p>
      <hr />
      <Link to={'/app/' + allRoutesData.pjNovaMinhaVaga.path}>Nova Vaga</Link>
      <hr />
      
      {vagasData.map((item, id) => (
        <p key={item}>
          <Link to={'/app/' + allRoutesData.pjMinhaVaga.path + id + '/' + item}>
            {item}
          </Link>
        </p>
      ))}
    </div>
  );
};

export default MinhasVagasPage;
