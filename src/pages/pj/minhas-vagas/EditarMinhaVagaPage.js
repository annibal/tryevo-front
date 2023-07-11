import { Navigate, useParams } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import DadosMinhaVagaForm from "./DadosMinhaVagaForm.js";
import { useState } from "react";

const EditarMinhaVagaPage = () => {
  let { vagaId, vagaNome } = useParams();
  const [created, setCreated] = useState(false)

  const handleSubmit = () => {
    setCreated(true);
  }

  return (
    <div>
      <h2>Editar Vaga {vagaNome}</h2>
      <p>- Em construção -</p>
      <hr />
      <br />
      <br />

      <DadosMinhaVagaForm onSubmit={handleSubmit} />

      {created && (
        <Navigate to={'/app/' + allRoutesData.pjMinhaVaga.path + vagaId + '/' + vagaNome} />
      )}
    </div>
  );
};

export default EditarMinhaVagaPage;
