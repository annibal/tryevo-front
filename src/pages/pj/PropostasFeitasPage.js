import { Link } from "react-router-dom";
import allRoutesData from "../../base/routes_data";

const PropostasFeitasPage = () => {
  return (
    <div>
      <h2>Propostas Feitas</h2>
      <p>- Em construção -</p>
      <hr />

      <ul>
        <li>
          <Link to={'/app/' + allRoutesData.pjPropostaFeita.path + '1234'}>Proposta feita em 15/02/2023</Link>
        </li>
        <li>
          <Link to={'/app/' + allRoutesData.pjPropostaFeita.path + '5678'}>Proposta feita em 16/02/2023</Link>
        </li>
        <li>
          <Link to={'/app/' + allRoutesData.pjPropostaFeita.path + '9012'}>Proposta feita em 27/02/2023</Link>
        </li>
      </ul>
    </div>
  );
};

export default PropostasFeitasPage;
