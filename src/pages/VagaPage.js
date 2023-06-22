import { Link, useParams } from "react-router-dom";
import { useAuth } from "../base/AuthContext";

const VagaPage = () => {
  let { vagaId } = useParams();
  const auth = useAuth()

  return (
    <div className="vaga">
      <h2>
        Vaga {vagaId}
      </h2>
      <p>Descrição da vaga</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ipsam blanditiis error minus maxime voluptatum recusandae nobis dolores quia optio, dolor pariatur placeat modi natus suscipit architecto mollitia molestias assumenda.</p>
      <br />
      {auth.user && (
        <Link to={`/app/nova-proposta/${vagaId}`}>
          <button>
            Mandar Proposta
          </button>
        </Link>
      )}
    </div>
  );
}

export default VagaPage;
