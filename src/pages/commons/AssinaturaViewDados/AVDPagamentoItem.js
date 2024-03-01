import { Box, Chip, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import {
  enumMasks,
  enumPaymentType,
  optionsPaymentType,
} from "../../../providers/enumProvider";
import capitalize from "../../../utils/capitalize";
import applyMask from "../../../utils/applyMask";
import formatPreco from "../../../utils/formatPreco";
import formatDate from "../../../utils/formatDate";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const getStatusPagamento = (status, theme) => {
  if (status === "COMPLETED") {
    return {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
      label: "Aprovado",
    };
  }
  if (status === "REFUNDED") {
    return {
      backgroundColor: theme.palette.grey["300"],
      color: theme.palette.common.black,
      label: "Reembolsado",
    };
  }
  if (status === "PENDING") {
    return {
      backgroundColor: "#f1c40f",
      color: theme.palette.common.white,
      label: "Pendente",
    };
  }
  if (status === "UNPAID") {
    return {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.common.white,
      label: "Vencido",
    };
  }
  if (status === "CANCELED") {
    return {
      backgroundColor: theme.palette.grey["700"],
      color: theme.palette.common.white,
      label: "Cancelado",
    };
  }

  return {
    backgroundColor: theme.palette.grey["400"],
    color: theme.palette.common.black,
    label: status,
  };
};

export default function AVDPagamentoItem({ payment, paymentNumber }) {
  const theme = useTheme();
  const objPagto = payment || {};

  const statusPagto = getStatusPagamento(objPagto.status, theme);

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

  const objBoleto = objPagto.payment_method?.boleto || {};
  const strBoletoBarCodeRaw = objBoleto.barcode || "";
  const strBoletoBarCode = objBoleto.formatted_barcode || "";
  const strBoletoId = (objBoleto.id || "").toLowerCase();
  const strBoletoVencimento = formatDate(
    objBoleto.due_at,
    "DD [de] MMMM [de] YYYY",
    false
  );
  const urlBoletoPNG = `https://boleto.sandbox.pagseguro.com.br/${strBoletoId}.png`;
  const urlBoletoPDF = `https://boleto.sandbox.pagseguro.com.br/${strBoletoId}.pdf`;

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
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CalendarMonthIcon sx={{ fontSize: "1em", mr: 1, color: "inherit", opacity: 0.7 }} />
                  <div>
                    <span style={{ fontSize: "1em" }}>Vencimento: </span>
                    {strBoletoVencimento}
                  </div>
                </Typography>
              </>
            )}

            <Typography
              variant="body2"
              color="text.secondary"
              component="p"
              sx={{ opacity: 0.6 }}
            >
              ID: {uuid}
            </Typography>
          </Grid>

          {paymentMethod === enumPaymentType.BOLETO && (
            <Grid item xs={12}>
              <Tooltip
                title="Clique para copiar o código de barras"
                placement="left"
                arrow
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="a"
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(strBoletoBarCodeRaw);
                    } catch (e) {
                      alert("Não foi possível copiar o código de barras");
                    }
                  }}
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    [`&:hover`]: {
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                >
                  <ViewWeekIcon sx={{ fontSize: "1.5em", mr: 1 }} />
                  <div>
                    <span style={{ fontSize: "0.8em" }}>Código de Barras:</span>
                    <br /> {strBoletoBarCode}
                  </div>
                  <ContentCopyIcon sx={{ fontSize: "1.5em", ml: "auto" }} />
                </Typography>
              </Tooltip>

              <Grid container spacing={2}>
                <Grid item xs>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="a"
                    href={urlBoletoPNG}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      [`&:hover`]: {
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <ImageIcon sx={{ fontSize: "1.5em", mr: 1 }} />
                    Ver Boleto
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="a"
                    href={urlBoletoPDF}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      [`&:hover`]: {
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <DescriptionIcon sx={{ fontSize: "1.5em", mr: 1 }} />
                    Baixar PDF
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
