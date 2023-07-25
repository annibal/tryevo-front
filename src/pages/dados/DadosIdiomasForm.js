import { useEffect, useState } from "react";
import ManyForm from "../commons/ManyForm";

const DadosIdiomasForm = ({ data }) => {
  const [dados, setDados] = useState(data || {});

  useEffect(() => {
    if (data) {
      setDados(data);
    }
  }, [data]);

  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
  };

  return (
    <ManyForm
      data={dados}
      label="Idioma"
      tipoLabel="Fluência do Idioma"
      name="linguagens"
      onChange={handleChange}
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
