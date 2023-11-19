import { Box, Button, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "../../providers/useFetch";
import ResponseWrapper from "../../components/ResponseWrapper";
import PrettyPrint from "../commons/PrettyPrint";
import FormSelect from "../commons/form/FormSelect";
import { useEffect, useState } from "react";
import { doCall } from "../../providers/baseProvider";
import Section from "../../components/Section";
import FormInput from "../commons/form/FormInput";

const ManageSingleUser = () => {
  const { usuarioId } = useParams();
  const [plano, setPlano] = useState();
  const [newUserPass, setNewUserPass] = useState();
  const [loadingChangePlano, setLoadingChangePlano] = useState(false);
  const [errorChangePlano, setErrorChangePlano] = useState(null);
  const [loadingChangeSenha, setLoadingChangeSenha] = useState(false);
  const [errorChangeSenha, setErrorChangeSenha] = useState(null);
  const [cache, setCache] = useState(+new Date());

  const planAssResponse = useFetch("GET", "planos-assinatura?active=true");
  const planAssData = planAssResponse.data || [];
  const optionsPlanAss = planAssData.map((planAss) => ({
    value: planAss._id,
    label: `${planAss.tipo} - ${planAss.nome}`,
  }));

  const userAuthResponse = useFetch(
    "GET",
    `auth/user/${usuarioId}?cache=${cache}`
  );
  const userInfoResponse = useFetch(
    "GET",
    `info/other/${usuarioId}?cache=${cache}`
  );

  useEffect(() => {
    if (userAuthResponse.data?.plano) {
      setPlano(userAuthResponse.data.plano);
    }
  }, [userAuthResponse.data?.plano]);

  const handleChangePlano = (newPlano) => {
    setErrorChangePlano(null);
    setLoadingChangePlano(true);

    doCall("auth/update-plano", {
      method: "POST",
      body: { id: usuarioId, plano: newPlano },
    }).then(({ error }) => {
      if (error) {
        setErrorChangePlano(error?.message || error);
      } else {
        setCache(+new Date());
      }
    });
    setLoadingChangePlano(false);
  };

  const handleChangeSenha = (newSenha) => {
    setLoadingChangeSenha(true);
    setErrorChangeSenha(null);

    doCall("auth/change-user-password", {
      method: "POST",
      body: { id: usuarioId, senha: newSenha },
    }).then(({ error }) => {
      if (error) {
        setErrorChangeSenha(error?.message || error);
      } else {
        setCache(+new Date());
        setNewUserPass("");
      }
    });
    setLoadingChangeSenha(false);
  };

  let sectionTitle = usuarioId;
  if (userAuthResponse?.data?.email) {
    sectionTitle = userAuthResponse.data.email;
  }

  return (
    <div>
      <Section title={sectionTitle} subtitle="Gerenciar Usuário" spacing={4}>
        <ResponseWrapper {...userAuthResponse}>
          <PrettyPrint
            keyName="Dados da Conta"
            value={userAuthResponse.data}
            ignoreFields={["_id", "__v", "senha"]}
          />
        </ResponseWrapper>
      </Section>

      <Section title="Ações de Gerenciamento" spacing={4}>
        <Box sx={{ pb: 3 }}>
          {errorChangePlano && (
            <Box sx={{ pb: 2 }}>
              <Typography color="error">{String(errorChangePlano)}</Typography>
            </Box>
          )}
          <Grid container spacing={2}>
            <Grid item xs>
              {planAssResponse.loading ? (
                ""
              ) : (
                <FormSelect
                  data={{ plano }}
                  onChange={(val) => setPlano(val)}
                  disabled={loadingChangePlano}
                  name="plano"
                  label="Alterar Plano do Usuário"
                  options={optionsPlanAss}
                />
              )}
            </Grid>
            <Grid item>
              <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disableElevation
                  disabled={
                    plano === userAuthResponse.data?.plano || loadingChangePlano
                  }
                  onClick={() => handleChangePlano(plano)}
                >
                  Alterar Plano
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ pb: 3 }}>
          {errorChangeSenha && (
            <Box sx={{ pb: 2 }}>
              <Typography color="error">{String(errorChangeSenha)}</Typography>
            </Box>
          )}
          <Grid container spacing={2}>
            <Grid item xs>
              <FormInput
                data={{ senha: newUserPass }}
                onChange={(val) => setNewUserPass(val)}
                disabled={loadingChangeSenha}
                name="senha"
                label="Nova Senha"
              />
            </Grid>
            <Grid item>
              <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disableElevation
                  disabled={
                    newUserPass == null ||
                    newUserPass?.length === 0 ||
                    loadingChangeSenha
                  }
                  onClick={() => handleChangeSenha(newUserPass)}
                >
                  Alterar Senha
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Section>

      <Section title="Todos os Dados" spacing={4} withoutDivider>
        <ResponseWrapper {...userInfoResponse}>
          <PrettyPrint
            keyName="Informações do Usuário"
            value={userInfoResponse.data}
            ignoreFields={["__v", "senha"]}
          />
        </ResponseWrapper>
      </Section>
    </div>
  );
};

export default ManageSingleUser;
