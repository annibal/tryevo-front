import { Box, Chip, Grid, Typography, useTheme } from "@mui/material";
import InlineIconInfo from "../../../components/InlineIconInfo";
import { useAuth } from "../../../base/AuthContext";
import formatPreco from "../../../utils/formatPreco";
import formatDate from "../../../utils/formatDate";

const getStatusSubscription = (status, theme) => {
  if (status === "ACTIVE") {
    return {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      label: "Plano Ativo",
      desc: "Tudo certo: Seu plano de assinatura está ativo",
    };
  }
  const r = {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    label: "Status",
    desc: `O status do seu plano é "${status}"`,
  };

  if (status === "OVERDUE") {
    r.label = "Pagamento Atrasado";
    r.desc = "A fatura está vencida e/ou pagamento foi negado";
  }
  if (status === "PENDING") {
    r.label = "Pendente";
    r.desc =
      "O plano permanece pendente até que o pagamento via cartão seja autorizado ou a fatura seja compensada pela instituição financeira";
  }
  if (status === "SUSPENDED") {
    r.label = "Suspenso";
    r.desc = "Houve um problema com seu pagamento, ou ele foi negado";
  }
  if (status === "TRIAL") {
    r.label = "Período de Teste";
    r.desc = "Você está usando o plano no modo de teste";
  }

  if (status === "CANCELED") {
    r.backgroundColor = theme.palette.error.dark;
    r.label = "Cancelado";
    r.desc = "Sua assinatura foi cancelada";
  }
  if (status === "EXPIRED") {
    r.backgroundColor = theme.palette.error.dark;
    r.label = "Expirado";
    r.desc = "O período da assinatura encerrou";
  }

  return r;
};

export default function AVDPlan({ subscription, plan }) {
  const auth = useAuth();
  const theme = useTheme();

  const objSubs = subscription || {};
  const objPlan = plan || {};

  const isPlanoOverride = !!auth?.user?.planoExpirado
  const planLabel = objSubs.plan?.name || "";
  const planDesc = isPlanoOverride ? "O Plano Padrão foi aplicado devido a problemas na Assinatura." : objPlan.descricao || "";
  const objModoPagto =
    (objPlan.modosDePagamento || []).find(
      (x) => x.pagbankGatewayId === objSubs.plan?.id
    ) || {};
  const strPeriodicity = objModoPagto.nome;
  const val = objSubs.amount?.value;
  const strValor =
    "R$ " + (val == null || isNaN(val) ? "?,??" : formatPreco(val / 100));
  const numMeses = objModoPagto.meses;
  const strPaymentInterval =
    !numMeses || isNaN(numMeses)
      ? "---"
      : objModoPagto.meses + (objModoPagto.meses === 1 ? " mês" : " meses");
  const strNextInvoiceDate = formatDate(objSubs.next_invoice_at, "DD/MM/YYYY");

  const statusAssinatura = getStatusSubscription(objSubs.status, theme);

  const strDate = formatDate(
    objSubs.updated_at,
    "DD [de] MMMM [de] YYYY - HH:mm",
    false
  );
  const uuid = objSubs.id;

  return (
    <Box className="avd-subscription">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color={isPlanoOverride ? "error" : "text.primary"} variant="h5">{planLabel}</Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography color={isPlanoOverride ? "error" : "text.secondary"} sx={{ mb: 2 }}>
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

        <Grid item xs={12} sm={4}>
          <Chip
            label={statusAssinatura.label}
            sx={{
              backgroundColor: statusAssinatura.backgroundColor,
              color: statusAssinatura.color,
              mb: 2,
            }}
          />

          <Typography>{statusAssinatura.desc}.</Typography>
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
