import { useParams } from "react-router-dom";

const PropostaPage = () => {
  let { propostaId } = useParams();

  return (
    <div className="proposta">
      <h3>
        Proposta {propostaId}
      </h3>
      <p>Enviada em 01/01/2023</p>
      <p>Descrição da proposta feita</p>
    </div>
  );
}

export default PropostaPage;
