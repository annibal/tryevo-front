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
      <p>Curriculo do candidato</p>
      <br />
      <button className="nb-btn">Exibir Dados (paywall)</button>
      <br />
      <button className="nb-btn">Contratar</button>
    </div>
  );
};

export default PropostaFeitaPage;
