import { Box, Chip, Divider, Grid, Typography, useTheme } from "@mui/material";
import useFetch from "../../../providers/useFetch";
import ResponseWrapper from "../../../components/ResponseWrapper";
import AVDPagamentoItem from "./AVDPagamentoItem";
import formatPreco from "../../../utils/formatPreco";
import formatDate from "../../../utils/formatDate";

const getStatusFatura = (status, theme) => {
  if (status === "PAID") {
    return {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
      label: "Paga",
    };
  }
  if (status === "UNPAID") {
    return {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.common.white,
      label: "Não Paga",
    };
  }
  if (status === "OVERDUE") {
    return {
      backgroundColor: theme.palette.warning.dark,
      color: theme.palette.common.white,
      label: "Atrasada",
    };
  }
  if (status === "WAITING") {
    return {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
      label: "Aguardando",
    };
  }

  return {
    backgroundColor: theme.palette.grey["400"],
    color: theme.palette.common.black,
    label: status,
  };
};

export default function AVDFaturaItem({ invoice, invoiceNumber }) {
  const theme = useTheme();
  const invoiceId = invoice.id || "";

  const objInv = invoice || {};

  const paymentsResponse = useFetch(
    "GET",
    `auth/info-invoice-payment/${invoiceId}`
  );
  let arrPayments = paymentsResponse.data || [];
  // arrPayments = [...arrPayments, ...arrPayments, ...arrPayments];

  console.log(`arrPayments ${invoiceNumber} :>> `, arrPayments);

  const statusFatura = getStatusFatura(objInv.status, theme);

  const val = objInv.amount?.value;
  const strValor =
    "R$ " + (val == null || isNaN(val) ? "?,??" : formatPreco(val / 100));
  const strDate = formatDate(
    objInv.created_at,
    "DD [de] MMMM [de] YYYY - HH:mm",
    false
  );
  const customerLabel = objInv.customer?.email;
  const planLabel = objInv.plan?.name;

  return (
    <Box className="avd-fatura-item" sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
                  {invoiceId}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
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
          sm={2}
          sx={{ display: { xs: "none", sm: "block" } }}
        />
        <Grid item xs={12} sm={10}>
          <Divider />
        </Grid>
      </Grid>
    </Box>
  );
}
