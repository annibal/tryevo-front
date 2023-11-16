import { Link } from "react-router-dom";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import allRoutesData from "../../base/routes_data";
import FormInput from "./form/FormInput";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { doCall } from "../../providers/baseProvider";

const ForgotPasswordPage = () => {
  const [dadosSendCode, setDadosSendCode] = useState({});
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [sendCodeError, setSendCodeError] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const handleChangeSendCode = (value, name, data) => {
    setDadosSendCode({
      ...data,
      [name]: value,
    });
  };
  const [dadosNewPassword, setDadosNewPassword] = useState({});
  const [newPasswordLoading, setNewPasswordLoading] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const handleChangeNewPassword = (value, name, data) => {
    setDadosNewPassword({
      ...data,
      [name]: value,
    });
  };

  const handleSubmitSendCode = (event) => {
    event.preventDefault();
    setSendCodeLoading(true);
    setSendCodeError(null);

    doCall("auth/forgot-password-send-code", {
      method: "POST",
      body: dadosSendCode,
    }).then(({ success, data, error }) => {
      setSendCodeLoading(false);
      if (success) {
        setIsCodeSent(true);
      } else {
        setSendCodeError(error);
      }
    });
  };
  const handleSubmitNewPassword = (event) => {
    event.preventDefault();
    setNewPasswordLoading(true);
    setNewPasswordError(null);
    
    doCall("auth/forgot-password-reset-with-code", {
      method: "POST",
      body: {
        email: dadosSendCode.email,
        code: dadosNewPassword.code,
        newSenha: dadosNewPassword.pass
      },
    }).then(({ success, data, error }) => {
      setNewPasswordLoading(false);
      if (success) {
        setIsPasswordChanged(true);
      } else {
        setNewPasswordError(error);
      }
    });
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Esqueci a Senha
      </Typography>

      <Box sx={{ py: 2 }}>
        <form onSubmit={handleSubmitSendCode}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                Primeiro, insira seu email, vamos enviar um código pra você
              </Typography>
            </Grid>
            <Grid item xs>
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                disabled={isCodeSent && !newPasswordError}
                data={dadosSendCode}
                onChange={handleChangeSendCode}
                required
              />
              {!sendCodeLoading && sendCodeError && (
                <Box sx={{ pt: 2 }}>
                  <Typography color="error">{String(sendCodeError.message || sendCodeError)}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item>
              <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  disableElevation
                  loading={sendCodeLoading}
                >
                  Enviar Código
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box sx={{ py: 2 }}>
        <form onSubmit={handleSubmitNewPassword}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                {isCodeSent
                  ? "Verifique seu email, pegue o código, insira-o aqui e escolha uma nova senha."
                  : "Depois, você poderá inserir o código, e escolher uma nova senha para fazer login."}
              </Typography>
            </Grid>
            {isCodeSent && (
              <>
                <Grid item xs={12} sm={8}>
                  <FormInput
                    label="Código"
                    name="code"
                    type="code"
                    placeholder="Código"
                    data={dadosNewPassword}
                    onChange={handleChangeNewPassword}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <FormInput
                    label="Nova Senha"
                    name="pass"
                    type="pass"
                    placeholder="Nova Senha"
                    data={dadosNewPassword}
                    onChange={handleChangeNewPassword}
                    required
                  />
                  {!newPasswordLoading && newPasswordError && (
                    <Box sx={{ pt: 2 }}>
                      <Typography color="error">
                        {String(newPasswordError.message || newPasswordError)}
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={4}>
                  <div className="text-left">
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      disableElevation
                      loading={newPasswordLoading}
                    >
                      Alterar Senha
                    </LoadingButton>
                  </div>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </Box>

      <Box sx={{ py: 2, mt: 2 }}>
        <Divider sx={{ mb: 2 }} />
        {isPasswordChanged ? (
          <>
            <Typography sx={{ pb: 2 }}>Senha alterada com sucesso!</Typography>
            <Button
              variant="contained"
              size="large"
              LinkComponent={Link}
              to={`/app/${allRoutesData.login.path}`}
            >
              Fazer Login
            </Button>
          </>
        ) : (
          <Button
            variant="text"
            LinkComponent={Link}
            to={`/app/${allRoutesData.login.path}`}
          >
            Voltar
          </Button>
        )}
      </Box>
    </>
  );
};

export default ForgotPasswordPage;
