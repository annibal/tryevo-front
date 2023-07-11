import { Link, useParams } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";

const NovaPropostaPage = () => {
  let { vagaId, vagaNome } = useParams();

  return (
    <>
      <h2>Nova Proposta</h2>
      <p>para a vaga {vagaNome} #{vagaId}</p>
      <br />
      <Link to={'/app/' + allRoutesData.pfPropostas.path + (vagaId * 17) + '/' + vagaNome}>
        <button>
          Enviar
        </button>
      </Link>
    </>
  );
}

export default NovaPropostaPage;
