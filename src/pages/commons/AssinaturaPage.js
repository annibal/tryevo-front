import { Box, Button, Grid, Typography } from "@mui/material";
import useFetch from "../../providers/useFetch";
import Section from "../../components/Section";
import { useAuth } from "../../base/AuthContext";
import formatPreco from "../../utils/formatPreco";

const AssinaturaPage = () => {
  const auth = useAuth();
  const currPlanAssId = auth?.user?.plano?._id;

  const tipoConta = auth?.user?.plano?.tipo;
  const planAssUrl =
    `planos-assinatura?active=true` + (tipoConta ? `&tipo=${tipoConta}` : "");
  const planAssResponse = useFetch("GET", planAssUrl);
  const planAssData = planAssResponse.data || [];

  const handleSelectPlano = (planAss) => {};

  return (
    <Box>
      <Section title="Planos de Assinatura" withoutDivider titleVariant="h5">
        {planAssData.map((planAss) => {
          if (planAss.tipo === "MA") return "";

          const isPlanoAtual = planAss._id === currPlanAssId;
          const isFree = planAss.preco == 0;

          const precoMensal = planAss.preco;
          const precoAnualBruto = planAss.preco * 12;
          const valAnualComDesconto =
            (precoAnualBruto * (100 - +planAss.descontoAnual)) / 100;
          const precoAnual = valAnualComDesconto;
          const strDesconto = planAss.descontoAnual.toFixed(0) + "%";

          return (
            <Box
              sx={{
                py: 2,
                px: 3,
                mb: 4,
                border: "2px solid",
                borderColor: isPlanoAtual ? "primary.main" : "grey.400",
              }}
              key={planAss._id}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={8} container spacing={2} direction="column">
                  <Grid item>
                    {isPlanoAtual && (
                      <Typography
                        color={isPlanoAtual ? "primary" : "text.primary"}
                        variant="overline"
                        sx={{ mb: 1 }}
                      >
                        Plano Atual
                      </Typography>
                    )}
                    <Typography
                      color={isPlanoAtual ? "primary" : "text.primary"}
                      variant="h4"
                    >
                      {planAss.nome}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{planAss.descricao}</Typography>
                  </Grid>
                  <Grid item xs sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Button
                      disabled={isPlanoAtual}
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => handleSelectPlano(planAss)}
                    >
                      Selecionar Plano
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
                  {isFree ? (
                    <Box sx={{ p: 2 }}>
                      <Typography variant="overline">Preço</Typography>
                      <Typography variant="h4">R$ 0,00</Typography>
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ p: 2, mb: 1 }}>
                        <Typography variant="overline">Preço Mensal</Typography>
                        <Typography variant="h4" color="secondary">
                          {formatPreco(precoMensal)}
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, mb: 1 }}>
                        <Typography variant="overline">Preço Anual</Typography>
                        <Typography variant="h4" color="secondary">
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
                            {formatPreco(precoAnualBruto)}
                          </Typography>{" "}
                          {formatPreco(precoAnual)}
                        </Typography>
                        <Typography variant="body2">
                          Desconto de {strDesconto}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Section>
    </Box>
  );
};

export default AssinaturaPage;
