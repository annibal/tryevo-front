import { Box, Divider, Typography } from "@mui/material";
import DadosPessoaisForm from "./DadosPessoaisForm";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import IdiomasForm from "./DadosIdiomasForm";
import DadosEmpresaForm from "./DadosEmpresaForm";
import DadosEnderecoForm from "./DadosEnderecoForm";
import DadosEscolaridadeForm from "./DadosEscolaridadeForm";
import DadosExperienciaProfissionalForm from "./DadosExperienciaProfissionalForm";
import DadosProjetosForm from "./DadosProjetosForm";
import * as userInfoProvider from "../../providers/userInfoProvider";
import { useEffect, useState } from "react";
import DadosPrincipaisForm from "./DadosPrincipaisForm";
import { LoadingButton } from "@mui/lab";

const example_pf = {
  nomePrimeiro: "",
  nomeUltimo: "",
  nomePreferido: "",
  genero: "",
  estadoCivil: "",
  nacionalidade: "",
  nascimento: "date",
  categoriaCNH: "",
  isAleijado: false,
  aceitaTrabalharDistancia: 123,
  aceitaMudarDistancia: 123,
  isPsiquiatra: false,
  endereco: {
    cep: "",
    pais: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  },
  telefones: [
    {
      valor: "",
      descricao: "",
      tipo: "",
      isPrimario: false,
    },
  ],
  links: [
    {
      valor: "",
      descricao: "",
      tipo: "",
      isPrimario: false,
    },
  ],
  documentos: [
    {
      valor: "",
      descricao: "",
      tipo: "",
      isPrimario: false,
    },
  ],
  qualificacoes: [""],
  linguagens: [
    {
      valor: "",
      descricao: "",
      tipo: "",
      isPrimario: false,
    },
  ],
  projetosPessoais: [
    {
      titulo: "",
      url: "",
      descricao: "",
      quando: "",
    },
  ],
  escolaridades: [
    {
      nome: "",
      nivel: "",
      isCompleto: "",
      inicio: "",
      fim: "",
    },
  ],
  experienciasProfissionais: [
    {
      cargo: "",
      empresa: "",
      descricao: "",
      inicio: "",
      fim: "",
      isAtual: "",
      qualificacoes: "",
    },
  ],
};


function formDataToObject(formData) {
  let object = {}

  const debug = (message) => {
      //console.log(message)
  }

  /**
   * Parses FormData key xxx`[x][x][x]` fields into array
   */
  const parseKey = (key) => {
      const subKeyIdx = key.indexOf('[');

      if (subKeyIdx !== -1) {
          const keys = [key.substring(0, subKeyIdx)]
          key = key.substring(subKeyIdx)

          for (const match of key.matchAll(/\[(?<key>.*?)]/gm)) {
              keys.push(match.groups.key)
          }
          return keys
      } else {
          return [key]
      }
  }

  /**
   * Recursively iterates over keys and assigns key/values to object
   */
  const assign = (keys, value, object) => {
      const key = keys.shift()
      debug(key)
      debug(keys)

      // When last key in the iterations
      if (key === '' || key === undefined) {
          return object.push(value)
      }

      if (Reflect.has(object, key)) {
          debug('hasKey ' + key)
          // If key has been found, but final pass - convert the value to array
          if (keys.length === 0) {
              if (!Array.isArray(object[key])) {
                  debug('isArray ' + object[key])
                  object[key] = [object[key], value]
                  return
              }
          }
          // Recurse again with found object
          return assign(keys, value, object[key])
      }

      // Create empty object for key, if next key is '' do array instead, otherwise set value
      if (keys.length >= 1) {
          debug(`undefined '${key}' key: remaining ${keys.length}`)
          object[key] = keys[0] === '' ? [] : {}
          return assign(keys, value, object[key])
      } else {
          debug("set value: " + value)
          object[key] = value
      }
  }

  for (const pair of formData.entries()) {
      assign(parseKey(pair[0]), pair[1], object)
  }

  return object
}

const DadosPage = () => {
  const auth = useAuth();
  const [dados, setDados] = useState(auth?.userInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth?.userInfo) setDados(auth.userInfo);
  }, [auth?.userInfo]);

  const handleDados = (value, name, data) => {
    console.log(value, name, data);
    setDados({
      ...data,
      [name]: value,
    });
  };

  //

  async function handleSubmitPF(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);

    let obj = formDataToObject(formData)

    console.log({ dataJson: Object.fromEntries(formData.entries()), formData, obj });
    try {
      await userInfoProvider.saveInfoPF(obj);
    } catch (error) {
      console.log({ error, msg: error.message });
      setError(error);
    }
    setLoading(false);
  }

  async function handleSubmitPJ(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    console.log({ formData: Object.fromEntries(formData.entries()) });
    try {
      await userInfoProvider.saveInfoPJ(formData);
    } catch (error) {
      console.log({ error, msg: error.message });
      setError(error);
    }
    setLoading(false);
  }

  //

  if (auth.features[ACCOUNT_FEATURES.PF]) {
    return (
      <Box sx={{ pt: 2 }}>

        {!loading && error && (
          <Box sx={{ pb: 2 }}>
            <Typography color="error">{String(error)}</Typography>
          </Box>
        )}

        <form onSubmit={handleSubmitPF}>
          <div className="floating-save-button">
            <div className="content">
              <LoadingButton
                loading={loading}
                variant="contained"
                color="primary"
                type="submit"
              >
                Salvar
              </LoadingButton>
              </div>
          </div>
          
          <Typography variant="h4" gutterBottom>
            Dados Pessoais
          </Typography>
          <DadosPrincipaisForm
            data={dados || {}}
            onChange={handleDados}
            loading={loading}
          />
          <DadosPessoaisForm
            data={dados || {}}
            onChange={handleDados}
            loading={loading}
          />

          <Divider sx={{ my: 6 }} />

          <Typography variant="h4" gutterBottom>
            Endereço
          </Typography>
          <DadosEnderecoForm
            data={dados}
            onChange={handleDados}
            loading={loading}
          />

          <Divider sx={{ my: 6 }} />

          <Typography variant="h4" gutterBottom>
            Idiomas
          </Typography>
          <IdiomasForm data={dados} onChange={handleDados} loading={loading} />

          <Divider sx={{ my: 6 }} />

          <Typography variant="h4" gutterBottom>
            Escolaridade
          </Typography>
          <DadosEscolaridadeForm
            data={dados}
            onChange={handleDados}
            loading={loading}
          />

          <Divider sx={{ my: 6 }} />

          <Typography variant="h4" gutterBottom>
            Experiencia Profissional
          </Typography>
          <DadosExperienciaProfissionalForm
            data={dados}
            onChange={handleDados}
            loading={loading}
          />

          <Divider sx={{ my: 6 }} />

          <Typography variant="h4" gutterBottom>
            Projetos
          </Typography>
          <DadosProjetosForm
            data={dados}
            onChange={handleDados}
            loading={loading}
          />
        </form>
      </Box>
    );
  } else {
    return (
      "Em construcao"
      // <Box sx={{ pt: 2 }}>

      //   {!loading && error && (
      //     <Box sx={{ pb: 2 }}>
      //       <Typography color="error">{String(error)}</Typography>
      //     </Box>
      //   )}

      //   <form onSubmit={handleSubmitPJ}>
      //     <div className="floating-save-button">
      //       <div className="content">
      //         <LoadingButton
      //           loading={loading}
      //           variant="contained"
      //           color="primary"
      //           type="submit"
      //         >
      //           Salvar
      //         </LoadingButton>
      //         </div>
      //     </div>

      //     <Typography variant="h4" gutterBottom>
      //       Dados da Empresa
      //     </Typography>
      //     <DadosEmpresaForm
      //       data={dados}
      //       onChange={handleDados}
      //       loading={loading}
      //     />

      //     <Divider sx={{ my: 6 }} />

      //     <Typography variant="h4" gutterBottom>
      //       Endereço
      //     </Typography>
      //     <DadosEnderecoForm
      //       data={dados}
      //       onChange={handleDados}
      //       loading={loading}
      //     />
      //   </form>
      // </Box>
    );
  }
};

export default DadosPage;
