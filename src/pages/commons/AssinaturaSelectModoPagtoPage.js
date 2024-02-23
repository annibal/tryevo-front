import { Box, Button, Grid, Typography } from "@mui/material";
import useFetch from "../../providers/useFetch";
import Section from "../../components/Section";
import { useAuth } from "../../base/AuthContext";
import formatPreco from "../../utils/formatPreco";
import { Link, useParams } from "react-router-dom";
import ResponseWrapper from "../../components/ResponseWrapper";
import allRoutesData from "../../base/routes_data";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { doCall } from "../../providers/baseProvider";

const AssinaturaSelectModoPagtoPage = () => {
  const auth = useAuth();
  const currPlanAssId = auth?.user?.plano?._id;
  const { planAssId } = useParams();
  const [statusDowngrade, setStatusDowngrade] = useState({
    loading: false,
    error: null,
  });

  const tipoConta = auth?.user?.plano?.tipo;
  const planAssUrl = `plano-assinatura/${planAssId}`;
  const planAssResponse = useFetch("GET", planAssUrl);
  const planAssData = planAssResponse.data || {};

  let modosPagto = (planAssData.modosDePagamento || []).map((modoPagto) => {
    const nome = modoPagto.nome || "";
    const meses =
      !modoPagto.meses || isNaN(+modoPagto.meses) ? 1 : +modoPagto.meses;
    const preco =
      !modoPagto.preco || isNaN(+modoPagto.preco) ? 0 : +modoPagto.preco;
    const precoPorMes = meses === 0 || preco === 0 ? 0 : preco / meses;

    return {
      nome,
      meses,
      preco,
      precoPorMes,
      pagbankGatewayId: modoPagto.pagbankGatewayId,
    };
  });
  modosPagto = modosPagto.filter((modoPagto) => modoPagto);

  const precoMaisCaro = Math.max(
    ...modosPagto.map((modoPagto) => modoPagto.precoPorMes)
  );

  modosPagto.forEach((modoPagto) => {
    modoPagto.desconto = 1 - modoPagto.precoPorMes / precoMaisCaro;
  });

  const handleSelecionarPlanoGratis = () => {
    if (
      window.confirm(
        "Ao selecionar este plano, você irá cancelar sua assinatura atual. Tem certeza que deseja continuar?"
      )
    ) {
      setStatusDowngrade({
        loading: true,
        error: null,
      });
      doCall("plano-assinatura-downgrade", { method: "POST" }).then(
        (response) => {
          setStatusDowngrade({
            loading: false,
            error: response.error,
          });
          if (!response.error) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
      );
    }
  };

  return (
    <ResponseWrapper {...planAssResponse}>
      <Section
        title="Selecionar Plano de Assinatura"
        withoutDivider
        titleVariant="h5"
        spacing={3}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          {planAssData.nome}
        </Typography>
        <Typography variant="h5" sx={{ mb: 6 }}>
          {planAssData.descricao}
        </Typography>
        {modosPagto.map((modoPagto, idx) => {
          return (
            <Box
              sx={{
                py: 2,
                px: 3,
                mb: 4,
                border: "2px solid",
                borderColor: "grey.400",
              }}
              key={idx}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={8}
                  container
                  spacing={2}
                  direction="column"
                >
                  <Grid item>
                    <Typography color={"text.primary"} variant="h4">
                      {modoPagto.nome}
                    </Typography>
                  </Grid>

                  {/* CTA */}

                  <Grid
                    item
                    xs
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <Box>
                      {modoPagto.preco > 0 ? (
                        <Button
                          disabled={!modoPagto.pagbankGatewayId}
                          variant="contained"
                          color="primary"
                          size="large"
                          LinkComponent={Link}
                          to={
                            "/app/" +
                            allRoutesData.assinatura.path +
                            planAssId +
                            "/" +
                            modoPagto.pagbankGatewayId
                          }
                        >
                          Selecionar
                        </Button>
                      ) : (
                        <>
                          {!statusDowngrade.loading &&
                            statusDowngrade.error && (
                              <Typography color="error" sx={{ my: 2 }}>
                                {statusDowngrade.error?.message ||
                                  statusDowngrade.error}
                              </Typography>
                            )}
                          <LoadingButton
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleSelecionarPlanoGratis}
                            loading={statusDowngrade.loading}
                          >
                            Selecionar
                          </LoadingButton>
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
                  <Box sx={{ p: 2, mb: 1 }}>
                    <Typography variant="overline">Valor</Typography>
                    <Typography variant="h4" color="secondary">
                      {modoPagto.preco !== precoMaisCaro && (
                        <>
                          <Typography
                            component="span"
                            variant="h5"
                            color="text.secondary"
                            style={{
                              textDecoration: "line-through",
                              textDecorationSkipInk: "none",
                              textDecorationColor: "secondary.main",
                              color: "#888888",
                              opacity: 0.8,
                            }}
                          >
                            {formatPreco(precoMaisCaro * modoPagto.meses)}
                          </Typography>{" "}
                        </>
                      )}
                      {formatPreco(modoPagto.preco)}
                    </Typography>
                    {modoPagto.preco !== precoMaisCaro && (
                      <Typography variant="body2">
                        Desconto de {(modoPagto.desconto * 100).toFixed(2)}%
                        <br />
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Section>
    </ResponseWrapper>
  );
};

export default AssinaturaSelectModoPagtoPage;
