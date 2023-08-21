import { useEffect, useState } from "react";
import ManyForm from "../commons/ManyForm";

const DadosIdiomasForm = ({ data, onChange }) => {
  const [dados, setDados] = useState(data || {});

  useEffect(() => {
    if (data && data.linguagens) {
      setDados(data);
    }
  }, [data]);

  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
    onChange();
  };

  return (
    <ManyForm
      data={dados}
      label="Idioma"
      tipoLabel="Fluência do Idioma"
      name="linguagens"
      onChange={handleChange}
      valueOptions={[
        { value: "Portugues", label: "Portugues" },
        { value: "Inglês", label: "Inglês" },
        { value: "Espanhol", label: "Espanhol" },
        { value: "Francês", label: "Francês" },
        { value: "Italiano", label: "Italiano" },
        { value: "Alemão", label: "Alemão" },
        { value: "Japonês", label: "Japonês" },
        { value: "Mandarim-Chinês", label: "Mandarim-Chinês" },
        { value: "Russo", label: "Russo" },
      ]}
      options={[
        { value: "NENHUMA", label: "Nenhuma" },
        { value: "BASICA", label: "Básica" },
        { value: "INTERMEDIARIA", label: "Intermediária" },
        { value: "PROFICIENTE", label: "Proficiente" },
        { value: "FLUENTE", label: "Nativo / Fluente" },
      ]}
    />
  );
};

export default DadosIdiomasForm;
