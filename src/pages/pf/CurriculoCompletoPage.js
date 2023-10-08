import { useAuth } from "../../base/AuthContext";
import FullCV from "../../components/FullCV";

const CurriculoCompletoPage = () => {
  const { userInfo, user } = useAuth();

  const dadosCV = {
    ...userInfo,
    email: user.email,
  };

  return (
    <FullCV cv={dadosCV} />
  );
};

export default CurriculoCompletoPage;
