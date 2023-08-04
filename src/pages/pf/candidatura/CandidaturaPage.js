import { useParams } from "react-router-dom";

const CandidaturaPage = () => {
  let { candidaturaId } = useParams();

  return (
    <div className="candidatura">
      <h3>
        Candidatura {candidaturaId}
      </h3>
      <p>Enviada em 01/01/2023</p>
      <p>Descrição da candidatura feita</p>
    </div>
  );
}

export default CandidaturaPage;
