import { Box } from "@mui/material";
import { useAuth } from "../../../base/AuthContext";
import ResponseWrapper from "../../../components/ResponseWrapper";
import Section from "../../../components/Section";
import useFetch from "../../../providers/useFetch";
import PrettyPrint from "../PrettyPrint";
import { useEffect, useState } from "react";
import { doCall } from "../../../providers/baseProvider";
import AVDPlan from "./AVDPlan";
import AVDBillingInfo from "./AVDBillingInfo";
import AVDFaturaItem from "./AVDFaturaItem";

export default function AssinaturaViewDadosPage() {
  const auth = useAuth();
  const customerResponse = useFetch("GET", "auth/info-customer");
  const subscriptionResponse = useFetch("GET", "auth/info-subscription");
  const invoicesResponse = useFetch("GET", "auth/info-subscription-invoices");

  let arrInvoices = invoicesResponse.data || [];
  // arrInvoices = [...arrInvoices, ...arrInvoices, ...arrInvoices];

  // const [paymentsResponse, setPaymentsResponse] = useState({
  //   loading: false,
  //   error: null,
  //   data: [],
  // });
  // const invoiceIds = (invoicesResponse.data || []).map((x) => x.id);

  // useEffect(() => {
  //   if (paymentsResponse.loading) return;

  //   if (Array.isArray(invoiceIds) && invoiceIds.length > 0) {
  //     setPaymentsResponse({
  //       loading: true,
  //       error: null,
  //       data: [],
  //     });

  //     try {
  //       Promise.all(
  //         invoiceIds.map((id) => doCall(`auth/info-invoice-payment/${id}`))
  //       ).then((resp) => {
  //         setPaymentsResponse({
  //           loading: false,
  //           error: null,
  //           data: resp,
  //         });
  //       });
  //     } catch (err) {
  //       setPaymentsResponse({
  //         loading: false,
  //         error: err,
  //         data: [],
  //       });
  //     }
  //   }
  // }, [invoiceIds.join(",")]);

  return (
    <>
      <Section title="Minha Assinatura" titleVariant="h4" spacing={3}>
        <ResponseWrapper {...subscriptionResponse}>
          <AVDPlan subscription={subscriptionResponse.data} />
        </ResponseWrapper>
      </Section>

      <Section title="Dados de Pagamento" titleVariant="h5" spacing={3}>
        <ResponseWrapper {...customerResponse}>
          <AVDBillingInfo customerGateway={customerResponse.data} />
        </ResponseWrapper>
      </Section>

      <Section title="Faturas e Pagamentos" titleVariant="h5" spacing={3} withoutDivider>
        <ResponseWrapper {...invoicesResponse}>
          {arrInvoices.map((invoice, idx) => {
            return (
              <AVDFaturaItem
                key={idx}
                invoice={invoice}
                invoiceNumber={idx + 1}
              />
            );
          })}
        </ResponseWrapper>
      </Section>
    </>
  );
}
