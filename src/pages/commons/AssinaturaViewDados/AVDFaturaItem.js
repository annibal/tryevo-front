import { Box, Chip, Divider, Grid, Typography, useTheme } from "@mui/material";
import useFetch from "../../../providers/useFetch";
import ResponseWrapper from "../../../components/ResponseWrapper";
import AVDPagamentoItem from "./AVDPagamentoItem";

const getStatusFatura = (status, theme) => {
  return {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    label: "Pago",
  };
};

export default function AVDFaturaItem({ invoice, invoiceNumber }) {
  const theme = useTheme();
  const invoiceId = invoice.id || "";

  const paymentsResponse = useFetch(
    "GET",
    `auth/info-invoice-payment/${invoiceId}`
  );
  let arrPayments = paymentsResponse.data || [];
  // arrPayments = [...arrPayments, ...arrPayments, ...arrPayments];

  const statusFatura = getStatusFatura("", theme);

  const customerLabel = "customer.name@email.com";
  const planLabel = "Smart Premium Candidatos Empresas";
  const strValor = "R$ 115,90";
  const strDate = "20 de Fevereiro de 2024 - 11:46";
  const uuid = "INVO_89BA1754-05C5-4C4B-B2F7-0BD836115CF3";

  return (
    <Box className="avd-fatura-item" sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontSize: "1.3em", mb: 2, mt: 0 }}>
            Fatura #{invoiceNumber}:
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={4}>
                <Chip
                  label={statusFatura.label}
                  sx={{
                    backgroundColor: statusFatura.backgroundColor,
                    color: statusFatura.color,
                    width: "100%",
                  }}
                />
              </Grid>

              <Grid item xs={8}>
                <Typography>{strDate}</Typography>
                <Typography sx={{ fontSize: "1.3em", mb: 1 }}>
                  {strValor}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  {customerLabel}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  {planLabel}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  {uuid}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={{ fontSize: "1.3em", mb: 2, mt: 0 }}>
            Pagamentos:
          </Typography>

          <ResponseWrapper {...paymentsResponse}>
            {arrPayments.map((payment, idx) => {
              return (
                <AVDPagamentoItem
                  key={idx}
                  payment={payment}
                  paymentNumber={idx + 1}
                />
              );
            })}
          </ResponseWrapper>
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
          sx={{ display: { xs: "none", md: "block" } }}
        />
        <Grid item xs={12} md={10}>
          <Divider />
        </Grid>
      </Grid>
    </Box>
  );
}
