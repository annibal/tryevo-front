import { Link, useParams } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";

const MinhaVagaPage = () => {
  let { vagaId, vagaNome } = useParams();

  return (
    <div>
      <h2>Vaga {vagaNome} #{vagaId}</h2>
      <p>Criada por xyz em 01/02/2023</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ipsam blanditiis error minus maxime voluptatum recusandae nobis dolores quia optio, dolor pariatur placeat modi natus suscipit architecto mollitia molestias assumenda.</p>
      <p>- Em construção -</p>

      <hr />

      <Link to={'/app/' + allRoutesData.pjEditarMinhaVaga.path + vagaId + '/' + vagaNome}>Editar Vaga</Link>
      <br />
      <Link to={'/app/' + allRoutesData.pjMinhasVagas.path}>Excluir Vaga</Link>
      <br />
      
      <hr />

      <ul>
        <li>
          <Link to={'/app/' + allRoutesData.pjPropostaFeita.path + '1234'}>Candidatura feita em 15/02/2023</Link>
        </li>
        <li>
          <Link to={'/app/' + allRoutesData.pjPropostaFeita.path + '5678'}>Candidatura feita em 16/02/2023</Link>
        </li>
        <li>
          <Link to={'/app/' + allRoutesData.pjPropostaFeita.path + '9012'}>Candidatura feita em 27/02/2023</Link>
        </li>
      </ul>
    </div>
  );
};

export default MinhaVagaPage;
