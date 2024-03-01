import { Box, Grid, Typography, useTheme } from "@mui/material";
import InlineIconInfo from "../../../components/InlineIconInfo";
import {
  enumMasks,
  enumPaymentType,
  optionsPaymentType,
} from "../../../providers/enumProvider";
import { ACCOUNT_FEATURES } from "../../../base/AuthContext";
import formatDate from "../../../utils/formatDate";
import formatTelefone from "../../../utils/formatTelefone";
import applyMask from "../../../utils/applyMask";
import capitalize from "../../../utils/capitalize";

export default function AVDBillingInfo({ customerGateway, tipoConta }) {
  const objCust = customerGateway || {};
  const isPF = ACCOUNT_FEATURES.PF.includes(tipoConta);

  const strEmail = objCust.email;
  const strName = objCust.name;
  const objPhone = (objCust.phones || [])[0] || {};
  const strPhone = formatTelefone(`${objPhone.area}${objPhone.number}`);
  const strTaxIdValue = applyMask(
    objCust.tax_id,
    isPF ? enumMasks.CPF : enumMasks.CNPJ
  );
  const strTaxIdLabel = isPF ? "CPF" : "CNPJ";
  const strBirthDate = formatDate(
    objCust.birth_date,
    "DD [de] MMMM [de] YYYY",
    false
  );

  const strStreet = objCust.address?.street;
  const strNumber = objCust.address?.number;
  const strComplement = objCust.address?.complement;
  const strLocality = objCust.address?.locality;
  const strCity = objCust.address?.city;
  const strRegionCode = objCust.address?.region_code;
  const strPostalCode = applyMask(objCust.address?.postal_code, enumMasks.CEP);

  const objBillInfo = (objCust.billing_info || [])[0] || {};
  const paymentType = objBillInfo.type;
  const objPaymentType = optionsPaymentType.find(
    (x) => x.value === paymentType
  );
  const strPaymentType = objPaymentType?.label || "Boleto";

  const strCardBrand = capitalize(objBillInfo.card?.brand);
  const strCardNumber = applyMask(
    `${objBillInfo.card?.first_digits || ""}******${
      objBillInfo.card?.last_digits
    }`,
    enumMasks.CREDIT_CARD_SECURE
  );
  const strCardExpiry = [
    objBillInfo.card?.exp_month || "??",
    objBillInfo.card?.exp_year || "????",
  ].join("/");
  const strCardHolder = objBillInfo.card?.holder?.name;

  const strBoletoDesc = "Descrição Boleto";

  return (
    <Box className="avd-billing-info">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
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

        <Grid item xs={12} sm={4}>
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

        <Grid item xs={12} sm={4}>
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
