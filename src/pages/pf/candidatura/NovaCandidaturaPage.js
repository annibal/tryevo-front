import { Link, useParams } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";

const NovaCandidaturaPage = () => {
  let { vagaId, vagaNome } = useParams();

  return (
    <>
      <h2>Nova Candidatura</h2>
      <p>para a vaga {vagaNome} #{vagaId}</p>
      <br />
      <Link to={'/app/' + allRoutesData.pfCandidaturas.path + (vagaId * 17) + '/' + vagaNome}>
        <button className="nb-btn">
          Enviar
        </button>
      </Link>
    </>
  );
}

export default NovaCandidaturaPage;
