import { Link } from "react-router-dom";
import allRoutesData from "../../base/routes_data";

const propostas = [
  {
    _id: 123,
    vaga: { _id: 124, nome: "Programador" },
    pf: { _id: 125, nome: "José da Silva" },
  },
  {
    _id: 126,
    vaga: { _id: 124, nome: "Programador" },
    pf: { _id: 531, nome: "Ricardo de Souza" },
  },
  {
    _id: 128,
    vaga: { _id: 124, nome: "Analista de Sistemas" },
    pf: { _id: 125, nome: "José da Silva" },
  },
  {
    _id: 129,
    vaga: { _id: 124, nome: "Analista de Sistemas" },
    pf: { _id: 1253, nome: "Maria dos Santos" },
  },
  {
    _id: 130,
    vaga: { _id: 124, nome: "Analista de Sistemas" },
    pf: { _id: 342, nome: "João Laranjeiras" },
  },
  {
    _id: 131,
    vaga: { _id: 124, nome: "Vendedor de Coxinha" },
    pf: { _id: 531, nome: "Ademilton" },
  },
];

const PropostasFeitasPage = () => {
  return (
    <div>
      <h2>Propostas Feitas</h2>
      <p>- Em construção -</p>
      <hr />

      <ul>
        {propostas.map((proposta) => (
          <li>
            <p>
              <strong>{proposta.pf.nome}</strong>{" "}
              se candidatou para a vaga{" "}
              <Link to={"/app/" + allRoutesData.pjMinhaVaga.path + proposta.vaga._id + '/' + encodeURIComponent(proposta.vaga.nome)}>
                {proposta.vaga.nome}{" "}
              </Link>
              em 01/02/2023
            </p>
            <Link to={"/app/" + allRoutesData.pjPropostaFeita.path + proposta._id}>
              Ver Proposta
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropostasFeitasPage;
