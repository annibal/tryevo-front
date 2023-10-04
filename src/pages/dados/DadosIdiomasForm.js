import { useEffect, useState } from "react";
import ManyForm from "../commons/ManyForm";
import { optionsFluenciaLinguagem, optionsLinguagens } from "../../providers/enumProvider";

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
      tipoRequired={true}
      valorRequired={true}
      valueOptions={optionsLinguagens}
      options={optionsFluenciaLinguagem}
    />
  );
};

export default DadosIdiomasForm;
