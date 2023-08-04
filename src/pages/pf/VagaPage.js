import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../base/AuthContext";
import allRoutesData from "../../base/routes_data";
import { Helmet } from "react-helmet";

const VagaPage = () => {
  let { vagaId, vagaNome } = useParams();
  const auth = useAuth()

  return (
    <div className="vaga">
      <Helmet>
        <title>
          {vagaNome} - Vaga em TryEvo
        </title>
      </Helmet>
      <h2>
        Vaga {vagaNome} #{vagaId}
      </h2>
      <p>Descrição da vaga</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ipsam blanditiis error minus maxime voluptatum recusandae nobis dolores quia optio, dolor pariatur placeat modi natus suscipit architecto mollitia molestias assumenda.</p>
      <br />
      {auth.user && (
        <Link to={'/app/' + allRoutesData.pfNovaProposta.path + vagaId + '/' + vagaNome}>
          <button>
            Mandar Proposta
          </button>
        </Link>
      )}
    </div>
  );
}

export default VagaPage;
