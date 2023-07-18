import { Link } from "react-router-dom";
import allRoutesData from "../../base/routes_data";

const candidaturas = [
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

const CandidaturasFeitasPage = () => {
  return (
    <div>
      <h2>Candidaturas Feitas</h2>
      <p>- Em construção -</p>
      <hr />

      <ul>
        {candidaturas.map((candidatura) => (
          <li>
            <p>
              <strong>{candidatura.pf.nome}</strong>{" "}
              se candidatou para a vaga{" "}
              <Link to={"/app/" + allRoutesData.pjMinhaVaga.path + candidatura.vaga._id + '/' + candidatura.vaga.nome}>
                {candidatura.vaga.nome}{" "}
              </Link>
              em 01/02/2023
            </p>
            <Link to={"/app/" + allRoutesData.pjCandidaturaFeita.path + candidatura._id}>
              Ver Candidatura
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidaturasFeitasPage;
