import { Box, Grid, Typography, useTheme } from "@mui/material";
import InlineIconInfo from "../../../components/InlineIconInfo";
import {
  enumPaymentType,
  optionsPaymentType,
} from "../../../providers/enumProvider";

export default function AVDBillingInfo({ customerGateway }) {
  const strEmail = "customer.gateway@email.com";
  const strName = "Customer Gateway";
  const strPhone = "(11) 90000-1234";
  const strTaxIdValue = "123.456.789-10";
  const strTaxIdLabel = "CPF";
  const strBirthDate = "27 de Agosto de 1994";

  const strStreet = "Rua Rubens de Souza Araújo";
  const strNumber = "14";
  const strComplement = "n/a";
  const strLocality = "Vila Mangalot";
  const strCity = "São Paulo";
  const strRegionCode = "SP";
  const strPostalCode = "05.132-000";

  const paymentType = enumPaymentType.CREDIT_CARD;
  const objPaymentTime = optionsPaymentType.find(
    (x) => x.value === paymentType
  );
  const strPaymentType = objPaymentTime?.label || "??";

  const strCardBrand = "Mastercard";
  const strCardNumber = "5555 66** **** 8888";
  const strCardExpiry = "12/2026";
  const strCardHolder = "ARTHUR A TAVARES";

  const strBoletoDesc = "Descrição Boleto";

  return (
    <Box className="avd-billing-info">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <InlineIconInfo oneLine noIcon title="Email">
            {strEmail}
          </InlineIconInfo>
          <InlineIconInfo oneLine noIcon title="Nome">
            {strName}
          </InlineIconInfo>
          <InlineIconInfo oneLine noIcon title="Telefone">
            {strPhone}
          </InlineIconInfo>
          <InlineIconInfo oneLine noIcon title={strTaxIdLabel}>
            {strTaxIdValue}
          </InlineIconInfo>
          <InlineIconInfo oneLine noIcon title="Nascimento">
            {strBirthDate}
          </InlineIconInfo>
        </Grid>

        <Grid item xs={12} md={4}>
          <InlineIconInfo oneLine noIcon title="CEP">
            {strPostalCode}
          </InlineIconInfo>
          <InlineIconInfo oneLine noIcon title="Local">
            {strCity} - {strRegionCode}
          </InlineIconInfo>
          <InlineIconInfo oneLine noIcon title="Bairro">
            {strLocality}
          </InlineIconInfo>
          <InlineIconInfo oneLine noIcon title="Endereço">
            {strStreet}, {strNumber}
          </InlineIconInfo>
          <InlineIconInfo oneLine noIcon title="Complemento">
            {strComplement}
          </InlineIconInfo>
        </Grid>

        <Grid item xs={12} md={4}>
          <InlineIconInfo oneLine noIcon title="Meio de Pagamento">
            {strPaymentType}
          </InlineIconInfo>

          {paymentType === enumPaymentType.CREDIT_CARD && (
            <>
              <InlineIconInfo oneLine noIcon title="Bandeira">
                {strCardBrand}
              </InlineIconInfo>
              <InlineIconInfo oneLine noIcon title="Número">
                {strCardNumber}
              </InlineIconInfo>
              <InlineIconInfo oneLine noIcon title="Nome">
                {strCardHolder}
              </InlineIconInfo>
              <InlineIconInfo oneLine noIcon title="Expira em">
                {strCardExpiry}
              </InlineIconInfo>
            </>
          )}

          {paymentType === enumPaymentType.BOLETO && (
            <>
              <Typography variant="body2" color="text.secondary" component="p">
                {strBoletoDesc}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
