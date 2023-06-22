import { Link, useParams } from "react-router-dom";

const NovaPropostaPage = () => {
  let { vagaId } = useParams();

  return (
    <>
      <h2>Nova Proposta</h2>
      <p>para a vaga {vagaId}</p>
      <br />
      <Link to={`/app/proposta/${vagaId + 8}`}>
        <button>
          Criar proposta
        </button>
      </Link>
    </>
  );
}

export default NovaPropostaPage;
