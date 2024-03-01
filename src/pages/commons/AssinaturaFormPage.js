import { Box, Button, Grid, Typography } from "@mui/material";
import useFetch from "../../providers/useFetch";
import Section from "../../components/Section";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import formatPreco from "../../utils/formatPreco";
import { Link, useNavigate, useParams } from "react-router-dom";
import ResponseWrapper from "../../components/ResponseWrapper";
import allRoutesData from "../../base/routes_data";
import DadosEnderecoForm from "../dados/DadosEnderecoForm";
import FormMaskedInput from "./form/FormMaskedInput";
import FormDatepicker from "./form/FormDatepicker";
import FormInput from "./form/FormInput";
import { useEffect, useState } from "react";
import formDataToObject from "../../utils/formDataToObject";
import FormRadio from "./form/FormRadio";
import {
  enumPaymentType,
  optionsPaymentType,
} from "../../providers/enumProvider";
import FormSelect from "./form/FormSelect";
import FormCheckbox from "./form/FormCheckbox";
import { LoadingButton } from "@mui/lab";
import { doCall, getPagBankPublicKey } from "../../providers/baseProvider";
import LoaderTryEvo from "../../components/LoaderTryEvo";
import _ from "lodash";

const monthOptions = Array(12)
  .fill(null)
  .map((_, i) => (i + 1).toString().padStart(2, "0"))
  .map((x) => ({ value: x, label: x }));
const yearOptions = Array(20)
  .fill(null)
  .map((_, i) => i + new Date().getFullYear())
  .map((x) => ({ value: x, label: x }));
//

const AssinaturaFormPage = () => {
  const auth = useAuth();
  const tipoConta = auth?.user?.plano?.tipo;
  const holderSameInfoName = "holderSameInfo";
  const currPlanAssId = auth?.user?.plano?._id;
  const { planAssId, pagbankGatewayId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [authAutofilled, setAuthAutofilled] = useState(false);
  const [userHasGatewayCustomer, setUserHasGatewayCustomer] = useState(false);
  const [dados, setDados] = useState({});
  const customerGatewayResponse = useFetch("GET", "auth/info-customer");

  const isPF = ACCOUNT_FEATURES.PF.includes(tipoConta);
  const isPJ = ACCOUNT_FEATURES.PJ.includes(tipoConta);

  useEffect(() => {
    if (auth?.user?.gateway_id) {
      setUserHasGatewayCustomer(true);
      return;
    }

    if (authAutofilled) return;

    if (auth && auth.userInfo) {
      const userInfo = auth.userInfo;
      let name = "";
      if (isPF) {
        name = userInfo.nomePrimeiro;
        if (userInfo.nomeUltimo) {
          name += " " + userInfo.nomeUltimo;
        }
        if (!name) {
          name = userInfo.nomePreferido;
        }
      }
      if (isPJ) {
        name = userInfo.nomeResponsavel;
        if (!name) name = userInfo.nomeFantasia;
        if (!name) name = userInfo.razaoSocial;
      }

      let telefone = (userInfo.telefones || []).find(
        (t) => t.tipo === "CELULAR"
      )?.valor;
      if (!telefone) telefone = (userInfo.telefones || [])[0]?.valor;

      setDados({
        name,
        email: auth.user?.email,
        telefone,
        tax_id: isPF ? userInfo.cpf : userInfo.cnpj,
        nascimento: userInfo.nascimento,
        endereco: {
          ...(userInfo.endereco || {}),
          estado: (userInfo.endereco?.estado || "").slice(0, 2).toUpperCase(),
        },
        paymentMethod: enumPaymentType.CREDIT_CARD,
        // number
        // expMonth
        // expYear
        // cvv
        [holderSameInfoName]: true,
        holder_name: parseHolderName(name),
        holder_telefone: telefone,
        holder_tax_id: isPF ? userInfo.cpf : userInfo.cnpj,
        holder_nascimento: userInfo.nascimento,
      });
      setAuthAutofilled(true);
    }
  }, [auth]);

  useEffect(() => {
    console.log(customerGatewayResponse);
    if (authAutofilled) return;

    const cgData = customerGatewayResponse.data;
    if (cgData) {
      const phone = (cgData.phones || [])[0] || {};
      const billInfo = (cgData.billing_info || [])[0] || {};
      const billInfoHolder = (billInfo.card || {}).holder || {};
      const billInfoPhone = billInfoHolder.phone || {};
      const address = cgData.address || {};

      setDados({
        customer_gateway_id: cgData.id,
        name: cgData.name,
        email: cgData.email,
        telefone: `${phone.area}${phone.number}`,
        tax_id: cgData.tax_id,
        nascimento: cgData.birth_date,
        endereco: {
          bairro: address.locality,
          cep: address.postal_code,
          cidade: address.city,
          estado: (address.region_code || "").slice(0, 2).toUpperCase(),
          numero: address.number,
          rua: address.street,
          complemento: address.complement,
        },
        paymentMethod: billInfo.type,
        [holderSameInfoName]:
          billInfoHolder.birth_date === cgData.birth_date &&
          billInfoHolder.tax_id === cgData.tax_id,
        holder_name: parseHolderName(billInfoHolder.name),
        holder_telefone: `${billInfoPhone.area}${billInfoPhone.number}`,
        holder_tax_id: billInfoHolder.tax_id,
        holder_nascimento: billInfoHolder.birth_date,
      });
      setAuthAutofilled(true);
    }
  }, [customerGatewayResponse]);

  const handleChange = (value, name, data) => {
    if (
      (name === holderSameInfoName && value === true) ||
      data[holderSameInfoName] === true
    ) {
      setDados({
        ...data,
        [name]: value,
        holder_name: parseHolderName(data.name),
        holder_telefone: data.telefone,
        holder_tax_id: data.tax_id,
        holder_nascimento: data.nascimento,
      });
    } else {
      setDados({
        ...data,
        [name]: value,
      });
    }
  };

  const parseHolderName = (str) => _.deburr(str || "").toUpperCase();

  const handleChangeHolderName = (value, name, data) => {
    setDados({
      ...data,
      holder_name: parseHolderName(value),
    });
  };

  const planAssUrl = `plano-assinatura/${planAssId}`;
  const planAssResponse = useFetch("GET", planAssUrl);
  const planAssData = planAssResponse.data || {};

  let modoPagto = (planAssData.modosDePagamento || []).find(
    (modoPagto) => modoPagto.pagbankGatewayId === pagbankGatewayId
  );
  if (!modoPagto && !planAssResponse.error) {
    planAssResponse.error = "Modo de Pagamento não encontrato";
  }
  modoPagto = modoPagto || { preco: 0, meses: 0 };

  // TODO: validate CPF CNPJ

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);

    const dados = formDataToObject(formData);
    console.log("Dados", dados);

    const objData = {
      userId: auth.user._id,
      pagbankGatewayId,
      planAssId,
      paymentMethod: dados.paymentMethod,
      customer_gateway_id: dados.customer_gateway_id,
      customer: {
        user_id: auth.user._id,
        nome: dados.name,
        email: dados.email,
        cpf_cnpj: dados.tax_id.replace(/[./-]/gi, ""),
        data_nascimento: (dados.nascimento || "").slice(0, 10),
        area: (dados.telefone || "").slice(1, 3),
        numero_telefone: (dados.telefone || "").slice(5).replace("-", ""),
        rua: (dados.endereco || {}).rua,
        numero_rua: (dados.endereco || {}).numero,
        complemento: (dados.endereco || {}).complemento || "n/a",
        bairro: (dados.endereco || {}).bairro,
        cidade: (dados.endereco || {}).cidade,
        sigla_estado: (dados.endereco || {}).estado,
        cep: (dados.endereco || {}).cep.replace("-", ""),
      },
    };

    if (dados.paymentMethod === enumPaymentType.CREDIT_CARD) {
      const useSameInfo = !!dados[holderSameInfoName];
      const objCardData = {
        publicKey: getPagBankPublicKey(),
        holder: useSameInfo ? dados.name : dados.holder_name,
        number: dados.number.replace(/ /gi, ""),
        expMonth: dados.expMonth,
        expYear: dados.expYear,
        securityCode: dados.cvv,
      };

      const PagSeguro = window["PagSeguro"];
      if (!PagSeguro || !PagSeguro.encryptCard) {
        alert("PagSeguro SDK inválido");
        setLoading(false);
        return;
      }
      const card = PagSeguro.encryptCard(objCardData);

      if (card.hasErrors) {
        console.log(card.errors);
        setError(card.errors.map((err) => err.message).join(". "));
        setLoading(false);
        return;
      }

      objData.card_encrypted = card.encryptedCard;
      objData.cvv = dados.cvv;

      objData.holder = useSameInfo
        ? {
            nome: dados.name,
            cpf_cnpj: dados.tax_id.replace(/[./-]/gi, ""),
            data_nascimento: (dados.nascimento || "").slice(0, 10),
            area: (dados.telefone || "").slice(1, 3),
            numero_telefone: (dados.telefone || "").slice(5).replace("-", ""),
          }
        : {
            nome: dados.holder_name,
            cpf_cnpj: dados.holder_tax_id.replace(/[./-]/gi, ""),
            data_nascimento: (dados.holder_nascimento || "").slice(0, 10),
            area: (dados.holder_telefone || "").slice(1, 3),
            numero_telefone: (dados.holder_telefone || "")
              .slice(5)
              .replace("-", ""),
          };
    }

    console.log("objData", objData);

    try {
      const { success, data, error } = await doCall("select-plano-assinatura", {
        method: "POST",
        body: objData,
      });
      if (success && data) {
        await auth.updateData(true);

        setLoading(false);
        setTimeout(() => {
          navigate(`/app/${allRoutesData.minhaAssinatura.path}`);
        }, 1000);
        return data;
      } else {
        throw Error(error?.message || error);
      }
    } catch (error) {
      console.log({ error, msg: error.message });
      setError(error);
    }
    setLoading(false);
  }

  return (
    <ResponseWrapper {...planAssResponse}>
      <Section
        title={`${planAssData.nome} - ${modoPagto.nome}`}
        titleVariant="h4"
        spacing={3}
      >
        <Grid container spacing={2}>
          <Grid item>
            <Box
              sx={{
                py: 2,
                px: 3,
                mb: 4,
                border: "2px solid",
                borderColor: "grey.400",
              }}
            >
              <Typography>Valor: {formatPreco(modoPagto.preco)}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                py: 2,
                px: 3,
                mb: 4,
                border: "2px solid",
                borderColor: "grey.400",
              }}
            >
              <Typography>
                Duração: {modoPagto.meses}{" "}
                {modoPagto.meses === 1 ? "mês" : "meses"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs />
        </Grid>
      </Section>

      <form onSubmit={handleSubmit}>
        {userHasGatewayCustomer && !authAutofilled ? (
          <LoaderTryEvo />
        ) : (
          <Section title="Informações de Pagamento" withoutDivider>
            <input
              type="hidden"
              name="customer_gateway_id"
              value={dados.customer_gateway_id}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormInput
                  label="Nome Completo"
                  name="name"
                  required
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput
                  label="Email"
                  name="email"
                  required
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormMaskedInput
                  label="Telefone"
                  maskType="PHONE"
                  placeholder="(00) 00000-0000"
                  name="telefone"
                  required
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                {isPF && (
                  <FormMaskedInput
                    label="CPF"
                    name="tax_id"
                    maskType="CPF"
                    placeholder="000.000.000-00"
                    required
                    data={dados}
                    onChange={handleChange}
                  />
                )}
                {isPJ && (
                  <FormMaskedInput
                    label="CNPJ"
                    name="tax_id"
                    maskType="CNPJ"
                    required
                    placeholder="00.000.000/0000-00"
                    data={dados}
                    onChange={handleChange}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormDatepicker
                  label="Data de Nascimento"
                  name="nascimento"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: 2 }} />
            </Grid>

            <DadosEnderecoForm data={dados} onChange={() => {}} />
          </Section>
        )}

        <Box sx={{ mb: 3 }}>
          <FormRadio
            label="Tipo de Pagamento"
            name="paymentMethod"
            // row
            data={dados}
            onChange={handleChange}
            options={optionsPaymentType}
          />
        </Box>

        {dados.paymentMethod === enumPaymentType.CREDIT_CARD && (
          <Section title="Dados do Cartão">
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <FormMaskedInput
                  label="Número do Cartão"
                  name="number"
                  maskType="CREDIT_CARD"
                  placeholder="0000 0000 0000 0000"
                  required
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <FormSelect
                  label="Mes"
                  name="expMonth"
                  required
                  data={dados}
                  onChange={handleChange}
                  options={monthOptions}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <FormSelect
                  label="Ano"
                  name="expYear"
                  required
                  data={dados}
                  onChange={handleChange}
                  options={yearOptions}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <FormMaskedInput
                  label="CVV"
                  name="cvv"
                  maskType="CVV"
                  placeholder="000"
                  required
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>

              {/* holder */}

              <Grid item xs={12}>
                <FormCheckbox
                  label="Dono do Cartão: Utilizar mesmas informações de pagamento"
                  name={holderSameInfoName}
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormInput
                  label="Nome Completo"
                  name="holder_name"
                  required
                  data={dados}
                  onChange={handleChangeHolderName}
                  disabled={dados.holderSameInfo}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormMaskedInput
                  label="Telefone"
                  maskType="PHONE"
                  placeholder="(00) 00000-0000"
                  name="holder_telefone"
                  required
                  data={dados}
                  onChange={handleChange}
                  disabled={dados.holderSameInfo}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                {isPF && (
                  <FormMaskedInput
                    label="CPF"
                    name="holder_tax_id"
                    maskType="CPF"
                    placeholder="000.000.000-00"
                    required
                    data={dados}
                    onChange={handleChange}
                    disabled={dados.holderSameInfo}
                  />
                )}
                {isPJ && (
                  <FormMaskedInput
                    label="CNPJ"
                    name="holder_tax_id"
                    maskType="CNPJ"
                    placeholder="00.000.000/0000-00"
                    required
                    data={dados}
                    onChange={handleChange}
                    disabled={dados.holderSameInfo}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormDatepicker
                  label="Data de Nascimento"
                  name="holder_nascimento"
                  data={dados}
                  onChange={handleChange}
                  disabled={dados.holderSameInfo}
                />
              </Grid>
            </Grid>
          </Section>
        )}

        {dados.paymentMethod === enumPaymentType.BOLETO && (
          <Section title="Boleto">
            <Box sx={{ maxWidth: 700 }}>
              <Typography sx={{ ["& b"]: { fontWeight: 600 } }}>
                O boleto será <b>enviado para o seu email</b>, e também poderá
                ser visualizado em:
                <br />
                <b>Assinaturas → Minha Assinatura → Mais Informações.</b>
              </Typography>
            </Box>
          </Section>
        )}

        {!loading && error && (
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Typography color="error">{String(error)}</Typography>
          </Box>
        )}

        <Box sx={{ textAlign: "right" }}>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            Assinar Plano
          </LoadingButton>
        </Box>
      </form>
    </ResponseWrapper>
  );
};

export default AssinaturaFormPage;
