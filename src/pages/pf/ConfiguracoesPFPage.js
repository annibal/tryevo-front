import { useAuth } from "../../base/AuthContext";

const ConfiguracoesPFPage = () => {
  const { features } = useAuth();

  return (
    <div>
      <h2>Configurações Pessoa Física</h2>
      <p>- Em construção -</p>
      <hr />
      {Object.entries(features || {}).map((entry) => (
        <p><b>{entry[0]}:&nbsp;</b> {entry[1] ? 'SIM' : 'NÃO'}</p>
      ))}
    </div>
  );
};

export default ConfiguracoesPFPage;
