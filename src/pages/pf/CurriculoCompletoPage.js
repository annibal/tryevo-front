import { useAuth } from "../../base/AuthContext";
import FullCV from "../../components/FullCV";
import Section from "../../components/Section";

const CurriculoCompletoPage = () => {
  const { userInfo, user } = useAuth();

  const dadosCV = {
    ...userInfo,
    email: user.email,
  };

  return (
    <Section withoutDivider title="Curriculo Completo">
      <FullCV cv={dadosCV} />
    </Section>
  );
};

export default CurriculoCompletoPage;
