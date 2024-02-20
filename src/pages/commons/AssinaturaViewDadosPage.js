import { Box } from "@mui/material";
import { useAuth } from "../../base/AuthContext";
import ResponseWrapper from "../../components/ResponseWrapper";
import Section from "../../components/Section";
import useFetch from "../../providers/useFetch";
import PrettyPrint from "./PrettyPrint";
import { useEffect, useState } from "react";
import { doCall } from "../../providers/baseProvider";

export default function AssinaturaViewDadosPage() {
  const auth = useAuth();
  const customerResponse = useFetch("GET", "auth/info-customer");
  const subscriptionResponse = useFetch("GET", "auth/info-subscription");
  const invoicesResponse = useFetch("GET", "auth/info-subscription-invoices");

  const [paymentsResponse, setPaymentsResponse] = useState({
    loading: false,
    error: null,
    data: [],
  });
  const invoiceIds = (invoicesResponse.data || []).map((x) => x.id);

  useEffect(() => {
    if (paymentsResponse.loading) return;

    if (Array.isArray(invoiceIds) && invoiceIds.length > 0) {
      setPaymentsResponse({
        loading: true,
        error: null,
        data: [],
      });

      try {
        Promise.all(
          invoiceIds.map((id) => doCall(`auth/info-invoice-payment/${id}`))
        ).then((resp) => {
          setPaymentsResponse({
            loading: false,
            error: null,
            data: resp,
          });
        });
      } catch (err) {
        setPaymentsResponse({
          loading: false,
          error: err,
          data: [],
        });
      }
    }
  }, [invoiceIds.join(",")]);

  return (
    <>
      <Section title="Minha Assinatura" titleVariant="h4" spacing={3}>
        // TODO
      </Section>

      <Section title="Meus Dados" titleVariant="h5" spacing={3}>
        <PrettyPrint keyName="Auth User" value={auth?.user} />
      </Section>

      <Section title="Dados de Pagamento" titleVariant="h5" spacing={3}>
        <ResponseWrapper {...customerResponse}>
          <PrettyPrint
            keyName="Customer Gateway"
            value={customerResponse.data}
            ignoreFields={["links"]}
          />
        </ResponseWrapper>
      </Section>

      <Section title="Dados da Assinatura" titleVariant="h5" spacing={3}>
        <ResponseWrapper {...subscriptionResponse}>
          <PrettyPrint
            keyName="Subscription Gateway"
            value={subscriptionResponse.data}
            ignoreFields={["links"]}
          />
        </ResponseWrapper>
      </Section>

      <Section title="Invoices" titleVariant="h5" spacing={3}>
        <ResponseWrapper {...invoicesResponse}>
          <PrettyPrint
            keyName="Invoices Gateway"
            value={invoicesResponse.data}
            ignoreFields={["links"]}
          />
        </ResponseWrapper>
      </Section>

      <Section title="Payments" titleVariant="h5" spacing={3}>
        <ResponseWrapper {...paymentsResponse}>
          {(paymentsResponse.data || []).map((payment, i) => (
            <PrettyPrint
              key={payment.id}
              keyName={`Payment #${i + 1}`}
              value={payment}
              ignoreFields={["links"]}
            />
          ))}
        </ResponseWrapper>
      </Section>
    </>
  );
}
