import { Navigate } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import DadosMinhaVagaForm from "./DadosMinhaVagaForm.js";
import { useState } from "react";

const NovaMinhaVagaPage = () => {
  const vagaId = 123;
  const vagaNome = 'Nome da Vaga';

  const [created, setCreated] = useState(false)

  const handleSubmit = () => {
    setCreated(true);
  }

  return (
    <div>
      <h2>Criar Vaga</h2>
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

export default NovaMinhaVagaPage;
