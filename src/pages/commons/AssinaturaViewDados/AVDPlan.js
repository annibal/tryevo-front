import { Box, Chip, Grid, Typography, useTheme } from "@mui/material";
import InlineIconInfo from "../../../components/InlineIconInfo";
import { useAuth } from "../../../base/AuthContext";

const getStatusSubscription = (status, theme) => {
  return {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    label: "Ativo",
  };
};

export default function AVDPlan({ subscription }) {
  const auth = useAuth();
  const theme = useTheme();

  const planLabel = "Smart Premium Candidatos Empresas";
  const planDesc =
    "Officiis deleniti aspernatur magni officiis. Laboriosam saepe velit voluptatem autem consequatur corporis eum et. Quam eligendi voluptatem ea sed.";
  const strPeriodicity = "Anual";
  const strValor = "115,90";
  const strPaymentInterval = "12 meses";
  const strNextInvoiceDate = "20/02/2025";

  const statusAssinatura = getStatusSubscription("", theme);
  const strPlanError = "";

  const strDate = "20 de Fevereiro de 2024 - 11:46";
  const uuid = "INVO_89BA1754-05C5-4C4B-B2F7-0BD836115CF3";

  return (
    <Box className="avd-subscription">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{planLabel}</Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {planDesc}
          </Typography>

          <InlineIconInfo oneLine noIcon title="Periodicidade Selecionada">
            {strPeriodicity}
          </InlineIconInfo>

          <InlineIconInfo oneLine noIcon title="Valor do Plano">
            {strValor}
          </InlineIconInfo>

          <InlineIconInfo oneLine noIcon title="Pagamento a cada">
            {strPaymentInterval}
          </InlineIconInfo>

          <InlineIconInfo oneLine noIcon title="Próxima Fatura">
            {strNextInvoiceDate}
          </InlineIconInfo>
        </Grid>

        <Grid item xs={12} md={4}>
          <Chip
            label={statusAssinatura.label}
            sx={{
              backgroundColor: statusAssinatura.backgroundColor,
              color: statusAssinatura.color,
              mb: 2,
            }}
          />

          {strPlanError && (
            <Typography color="error">{strPlanError}</Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary" component="p">
            {strDate} - {uuid}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
