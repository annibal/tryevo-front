import { Box, Divider, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { doCall } from "../../../providers/baseProvider";
import FormCheckbox from "../../commons/form/FormCheckbox";
import FormInput from "../../commons/form/FormInput";
import FormSelect from "../../commons/form/FormSelect";
import useFetch from "../../../providers/useFetch";
import unslugifyFeatureChave from "./unslugifyFeatureChave";
import PlanAssFormModosPagto from "./PlanAssFormModosPagto";

const sxCbx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
};

const defaultData = {
  active: true,
  preco: 0,
  descontoAnual: 0,
};

const PlanAssForm = ({ data, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dados, setDados] = useState(data || defaultData);
  const [idsRemove, setIdsRemove] = useState([]);
  const [dadosFeatures, setDadosFeatures] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const planAssTiposQuery = useFetch("GET", `tipos-planos-assinatura`);
  const optionsTipoPlanAss = (planAssTiposQuery.data || []).map((tipoPlanAss) => ({
    value: tipoPlanAss.tipo,
    label: tipoPlanAss.nome,
  }));
  const planAssFeaturesQuery = useFetch("GET", `features-planos-assinatura`);
  const planAssFeatData = planAssFeaturesQuery.data || [];

  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
    setHasChanges(true);
  };
  const handleChangeFeature = (value, name, data) => {
    setDadosFeatures({
      ...(data || {}),
      [name]: { chave: name, valor: +value },
    });
    setHasChanges(true);
  };
  const handleRemoveIntegrado = (gatewayId) => {
    setIdsRemove([...idsRemove, gatewayId]);
  }

  useEffect(() => {
    if (data?.features && Object.keys(dadosFeatures).length === 0) {
      setDadosFeatures(
        (data.features || []).reduce(
          (all, curr) => ({
            ...all,
            [`${data.tipo}::${curr.chave}`]: {
              chave: `${data.tipo}::${curr.chave}`,
              valor: +curr.valor,
            },
          }),
          {}
        )
      );
    }
  }, [data?.features]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const planAssObj = { ...dados, features: [] };
      if (data?._id) planAssObj._id = data._id;

      Object.values(dadosFeatures).forEach((dadoFeat) => {
        const [tipo, chave] = dadoFeat.chave.split("::");
        if (dadoFeat.valor && tipo === planAssObj.tipo) {
          const objFeature = {
            chave,
            valor: +dadoFeat.valor,
          };
          planAssObj.features.push(objFeature);
        }
      });

      console.log(planAssObj);

      if (!planAssObj.modosDePagamento || planAssObj.modosDePagamento.length === 0) {
        setError("Defina pelo menos um Modo de Pagamento");
        setLoading(false);
        return;
      }

      planAssObj.idsRemove = idsRemove;

      doCall("/plano-assinatura", { method: "POST", body: planAssObj }).then(
        (response) => {
          if (response.error) {
            setError(response.error?.message || response.error);
          } else {
            setHasChanges(false);
            onSubmit(response.data);
          }
          setLoading(false);
        }
      );
    } catch (error) {
      console.log({ error, msg: error.message });
      setError(error);
      setLoading(false);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <FormInput
              label="Nome"
              name="nome"
              required
              data={dados}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={sxCbx}>
            <FormCheckbox
              label="Ativo"
              name="active"
              data={dados}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            {planAssTiposQuery.loading ? "" : (
              <FormSelect
                label="Tipo de Conta"
                name="tipo"
                required
                data={dados}
                onChange={handleChange}
                options={optionsTipoPlanAss}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} sx={sxCbx}>
            <FormCheckbox
              label="É o plano padrão para novos usuários desse tipo?"
              name="defaultForTipo"
              data={dados}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormInput
              label="Descrição"
              name="descricao"
              multiline
              rows={4}
              data={dados}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" sx={{ mb: 2 }}>
              Features ({dados.tipo})
            </Typography>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            {planAssFeatData.map((feature) => {
              const { tipo, chave, valType, parent } = feature;
              const label = unslugifyFeatureChave(chave);
              const name = `${tipo}::${chave}`;
              const enabled = dadosFeatures[name]?.valor;
              const isType = tipo === dados.tipo;
              const isParentEnabled =
                parent == null
                  ? true
                  : !!dadosFeatures[`${tipo}::${parent}`]?.valor;
              return (
                <Fragment key={tipo + chave}>
                  {isType && isParentEnabled ? (
                    <Grid item xs={12} container spacing={2} wrap="nowrap">
                      <Grid item sx={sxCbx}>
                        <FormCheckbox
                          label={label}
                          name={name}
                          data={dadosFeatures}
                          getValue={() => enabled}
                          onChange={handleChangeFeature}
                        />
                      </Grid>
                      <Grid item xs sx={sxCbx}>
                        {valType === "LIMITE" && (
                          <FormInput
                            label={label}
                            name={name}
                            type="number"
                            data={dadosFeatures}
                            getValue={() => dadosFeatures[name]?.valor}
                            onChange={handleChangeFeature}
                          />
                        )}
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Fragment>
              );
            })}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" sx={{ mb: 2 }}>
              Modos de Pagamento
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <PlanAssFormModosPagto data={dados} onChange={handleChange} onRemoveIntegrado={handleRemoveIntegrado}/>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {!loading && error && (
            <Grid xs={12} sx={{ textAlign: "right" }}>
              <Typography color="error">{String(error)}</Typography>
            </Grid>
          )}

          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <LoadingButton
              loading={loading}
              variant={hasChanges ? "contained" : "outlined"}
              color="primary"
              type="submit"
            >
              {data?._id ? "Atualizar Plano" : "Criar Plano"}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PlanAssForm;
