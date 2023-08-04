import { useParams } from "react-router-dom";

const PropostaFeitaPage = () => {
  let { propostaId } = useParams();

  return (
    <div>
      <h2>Proposta Feita</h2>
      <p>#{propostaId}</p>
      <p>- Em construção -</p>
      <p>Dados da vaga</p>
      <p>Dados da proposta</p>
      <p>Dados do cliente</p>
      <button>Contratar</button>
    </div>
  );
};

export default PropostaFeitaPage;
