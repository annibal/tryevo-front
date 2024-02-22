import { Box, Chip, Grid, Typography, useTheme } from "@mui/material";
import { enumPaymentType } from "../../../providers/enumProvider";

const getStatusPagamento = (status, theme) => {
  return {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    label: "Aprovado",
  };
};

export default function AVDPagamentoItem({ payment, paymentNumber }) {
  const theme = useTheme();

  const statusPagto = getStatusPagamento("", theme);

  const strValor = "115,90";
  const strDate = "20 de Fevereiro de 2024 - 11:46";
  const paymentMethod = "CREDIT_CARD";
  const uuid = "INVO_89BA1754-05C5-4C4B-B2F7-0BD836115CF3";

  const strCardBrand = "Mastercard";
  const strCardNumber = "5555 66** **** 8888";
  const strCardExpiry = "12/2026";
  const strCardHolder = "ARTHUR A TAVARES";

  const strBoletoDesc = "Descrição Boleto";

  return (
    <Box className="avd-pagamento-item" sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={4}>
            <Chip
              label={statusPagto.label}
              sx={{
                backgroundColor: statusPagto.backgroundColor,
                color: statusPagto.color,
                width: "100%",
              }}
            />
          </Grid>

          <Grid item xs={8}>
            <Typography
              variant="caption"
              color="text.secondary"
              component="p"
              sx={{ lineHeight: 1 }}
            >
              Pagamento #{paymentNumber}
            </Typography>
            <Typography>{strDate}</Typography>
            <Typography sx={{ fontSize: "1.2em", mb: 0.5 }}>
              {strValor}
            </Typography>

            {paymentMethod === enumPaymentType.CREDIT_CARD && (
              <>
                <Typography variant="body2" color="text.secondary" component="p">
                  {strCardBrand}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="p">
                  {strCardNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="p">
                  {strCardHolder}
                  {"  |  "}
                  {strCardExpiry}
                </Typography>
              </>
            )}

            {paymentMethod === enumPaymentType.BOLETO && (
              <>
                <Typography variant="body2" color="text.secondary" component="p">
                  Boleto
                </Typography>
                <Typography variant="body2" color="text.secondary" component="p">
                  {strBoletoDesc}
                </Typography>
              </>
            )}

            <Typography variant="body2" color="text.secondary" component="p">
              {uuid}
            </Typography>
          </Grid>
          
        </Grid>
      </Grid>
    </Box>
  );
}
