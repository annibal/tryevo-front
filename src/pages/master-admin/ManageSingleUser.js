import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "../../providers/useFetch";
import ResponseWrapper from "../../components/ResponseWrapper";
import PrettyPrint from "../commons/PrettyPrint";
import FormSelect from "../commons/form/FormSelect";
import { useEffect, useState } from "react";
import { USUARIO_PLANOS } from "./ManageAllUsers";
import { doCall } from "../../providers/baseProvider";

const ManageSingleUser = () => {
  const { usuarioId } = useParams();
  const [plano, setPlano] = useState();
  const [loadingChangePlano, setLoadingChangePlano] = useState(false);
  const [errorChangePlano, setErrorChangePlano] = useState(null);
  const [cache, setCache] = useState(+new Date())

  const userAuthResponse = useFetch('GET', `auth/user/${usuarioId}?cache=${cache}`);
  const userInfoResponse = useFetch('GET', `info/other/${usuarioId}?cache=${cache}`);

  useEffect(() => {
    if (userAuthResponse.data?.plano) {
      setPlano(userAuthResponse.data.plano);
    }
  }, [userAuthResponse]);

  const handleChangePlano = (newPlano) => {
    setErrorChangePlano(null);
    setLoadingChangePlano(true);

    doCall('auth/update-plano', { method: 'POST', body: { id: usuarioId, plano: newPlano }}).then(({ error }) => {
      if (error) {
        setErrorChangePlano(error?.message || error);
      } else {
        setCache(+new Date());
      }
    });
    setLoadingChangePlano(false);
  }

  return (
    <div>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3">Gerenciar Usuário</Typography>
      </Box>

      {errorChangePlano && (
        <Box sx={{ pb: 2 }}>
          <Typography color="error">{String(errorChangePlano)}</Typography>
        </Box>
      )}

      <Box sx={{ pb: 3 }}>
        <FormSelect
          data={{ plano }}
          onChange={(val) => handleChangePlano(val)}
          disabled={loadingChangePlano}
          name="plano"
          label="Alterar Plano do Usuário"
          options={USUARIO_PLANOS}
        />
      </Box>

      <ResponseWrapper {...userAuthResponse}>
        <PrettyPrint keyName="Dados da Conta" value={userAuthResponse.data} ignoreFields={['_id', '__v', 'senha']} />
      </ResponseWrapper>

      <ResponseWrapper {...userInfoResponse}>
        <PrettyPrint keyName="Informações do Usuário" value={userInfoResponse.data} ignoreFields={['__v', 'senha']} />
      </ResponseWrapper>

    </div>
  )
}

export default ManageSingleUser