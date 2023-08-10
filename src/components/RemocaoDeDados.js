import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { doCall } from "../providers/baseProvider";

const RemocaoDeDados = () => {
  const [statusRemocaoDados, setStatusRemocaoDados] = useState({
    loading: false,
    error: null,
    data: null,
  });
  const [statusRemocaoHistorico, setStatusRemocaoHistorico] = useState({
    loading: false,
    error: null,
    data: null,
  });
  const [statusRemocaoTotal, setStatusRemocaoTotal] = useState({
    loading: false,
    error: null,
    data: null,
  });

  const handleRemocaoDados = () => {
    setStatusRemocaoDados({ ...statusRemocaoDados, loading: true });
    doCall('auth/remocao-dados', { method: 'POST' }).then(response => {
      setStatusRemocaoDados({
        loading: false,
        error: response.error,
        data: response.data,
      });
      if (!response.error) {
        setTimeout(() => {
          window.location.reload();
        }, 5000)
      }
    })
  }
  const handleRemocaoHistorico = () => {
    setStatusRemocaoHistorico({ ...statusRemocaoHistorico, loading: true });
    doCall('auth/remocao-historico', { method: 'POST' }).then(response => {
      setStatusRemocaoHistorico({
        loading: false,
        error: response.error,
        data: response.data,
      });
      if (!response.error) {
        setTimeout(() => {
          window.location.reload();
        }, 5000)
      }
    })
  }
  const handleRemocaoTotal = () => {
    setStatusRemocaoTotal({ ...statusRemocaoTotal, loading: true });
    doCall('auth/remocao-total', { method: 'POST' }).then(response => {
      setStatusRemocaoTotal({
        loading: false,
        error: response.error,
        data: response.data,
      });
      if (!response.error) {
        setTimeout(() => {
          window.location.reload();
        }, 5000)
      }
    })
  }

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ mb: 2 }}>
          <strong>Remoção de Dados Dessoais</strong> - utilize este botão para limpar seu
          cadastro na TryEvo, sua conta continuará existindo e você vai
          conseguir fazer login normalmente, mas não haverá mais registro nenhum
          seu no nosso sistema. Será deletado: Dados Pessoais, Objetivos,
          Habilidades Telefones, Documentos, Links de Redes Sociais, Endereço,
          Escolaridade, Experiencias Profissionais e Projetos
        </Typography>
        <LoadingButton
          size="large"
          variant="contained"
          color="error"
          loading={statusRemocaoDados.loading}
          onClick={handleRemocaoDados}
        >
          Remover todos os meus Dados
        </LoadingButton>
        {!statusRemocaoDados.loading && statusRemocaoDados.error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {statusRemocaoDados.error?.message || statusRemocaoDados.error}
          </Typography>
        )}
        {!statusRemocaoDados.loading && statusRemocaoDados.data && (
          <>
            <Typography color="success.main" sx={{ mt: 2 }}>
              Dados Dessoais Removidos com Sucesso. Atualizando em 5s...
            </Typography>
            {/* <pre>{JSON.stringify(statusRemocaoDados.data, null, 2)}</pre> */}
          </>
        )}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ mb: 2 }}>
          <strong>Remoção de Histórico</strong> - utilize este botão para limpar seu histórico na
          TryEvo, sua conta continua existindo, seus dados continuam como estão,
          e você continua podendo fazer login, mas todo registro seu de
          utilização para com o app TryEvo será deletado do nosso sistema. Será
          deletado: todas as Vagas que você salvou, visitou, interagiu, e todas
          as Candidaturas e Propostas enviadas.
        </Typography>
        <LoadingButton
          size="large"
          variant="contained"
          color="error"
          loading={statusRemocaoHistorico.loading}
          onClick={handleRemocaoHistorico}
        >
          Remover todo meu Histórico
        </LoadingButton>
        {!statusRemocaoHistorico.loading && statusRemocaoHistorico.error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {statusRemocaoHistorico.error?.message || statusRemocaoHistorico.error}
          </Typography>
        )}
        {!statusRemocaoHistorico.loading && statusRemocaoHistorico.data && (
          <>
            <Typography color="success.main" sx={{ mt: 2 }}>
              Histórico Removido com Sucesso. Atualizando em 5s...
            </Typography>
            {/* <pre>{JSON.stringify(statusRemocaoHistorico.data, null, 2)}</pre> */}
          </>
        )}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ mb: 2 }}>
          <strong>Remoção Total</strong> - Tudo relacionado a sua conta será deletado, inclusive
          a conta em si. Este botão faz a mesma função dos dois botões acima,
          Remoção de Dados Pessoais e Remoção de Histórico, e além disso, deleta
          seu usuário, ou seja você não vai poder mais fazer login no TryEvo. Se
          quiser, pode se cadastrar novamente com o mesmo email.
        </Typography>
        <LoadingButton
          size="large"
          variant="contained"
          color="error"
          loading={statusRemocaoTotal.loading}
          onClick={handleRemocaoTotal}
        >
          Remover Minha Conta Totalmente
        </LoadingButton>
        {!statusRemocaoTotal.loading && statusRemocaoTotal.error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {statusRemocaoTotal.error?.message || statusRemocaoTotal.error}
          </Typography>
        )}
        {!statusRemocaoTotal.loading && statusRemocaoTotal.data && (
          <>
            <Typography color="success.main" sx={{ mt: 2 }}>
              Conta Inteira Removida com Sucesso. Atualizando em 5s...
            </Typography>
            {/* <pre>{JSON.stringify(statusRemocaoTotal.data, null, 2)}</pre> */}
          </>
        )}
      </Box>
    </>
  );
};

export default RemocaoDeDados;
