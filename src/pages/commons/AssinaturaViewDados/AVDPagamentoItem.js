import { Box, Chip, Grid, Typography, useTheme } from "@mui/material";
import { enumMasks, enumPaymentType, optionsPaymentType } from "../../../providers/enumProvider";
import capitalize from "../../../utils/capitalize";
import applyMask from "../../../utils/applyMask";
import formatPreco from "../../../utils/formatPreco";
import formatDate from "../../../utils/formatDate";

const getStatusPagamento = (status, theme) => {
  return {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    label: "Aprovado",
  };
};

export default function AVDPagamentoItem({ payment, paymentNumber }) {
  const theme = useTheme();
  const objPagto = payment || {};

  const statusPagto = getStatusPagamento("", theme);

  const val = objPagto.invoice?.amount?.value;
  const strValor =
    "R$ " + (val == null || isNaN(val) ? "?,??" : formatPreco(val / 100));
  const strDate = formatDate(
    objPagto.created_at,
    "DD [de] MMMM [de] YYYY - HH:mm",
    false
  );
  const paymentMethod = objPagto.payment_method?.type;
  const objPaymentType = optionsPaymentType.find(
    (x) => x.value === paymentMethod
  );
  const uuid = objPagto.id;

  const objCard = objPagto.payment_method?.card || {};
  const strCardBrand = capitalize(objCard.brand);
  const strCardNumber = applyMask(
    `${objCard.first_digits || ""}******${objCard.last_digits}`,
    enumMasks.CREDIT_CARD_SECURE
  );
  const strCardExpiry = [
    objCard.exp_month || "??",
    objCard.exp_year || "????",
  ].join("/");
  const strCardHolder = objCard.holder?.name;

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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  {strCardBrand}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  {strCardNumber}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  {strCardHolder}
                  {"  •  "}
                  {strCardExpiry}
                </Typography>
              </>
            )}

            {paymentMethod === enumPaymentType.BOLETO && (
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  Boleto
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
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
