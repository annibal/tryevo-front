import { Button } from "@mui/material";
import { CurriculumIcon } from "./CustomIcons";
import allRoutesData from "../base/routes_data";

const FullCVBtn = ({ propostaId, ...restProps }) => {
  let url = "/app/" + allRoutesData.pfCurriculoCompleto.path;
  if (propostaId) {
    url = "/app/" + allRoutesData.pjCurriculoCompleto.path + propostaId;
  }

  const handleVerCV = () => {
    const cvWin = window.open(url, "fullcv");

    setTimeout(() => {
      cvWin.postMessage({
        action: "navigate",
        payload: { to: url, options: { replace: true } },
      });
    }, 500);
  };

  return (
    <Button
      disableElevation
      variant="outlined"
      startIcon={<CurriculumIcon />}
      {...restProps}
      onClick={handleVerCV}
    >
      Ver CV Completo
    </Button>
  );
};

// <Button
//   sx={{ ml: 2 }}
//   disableElevation
//   variant="outlined"
//   LinkComponent={Link}
//   startIcon={<CurriculumIcon />}
//   to={
//     "/app/" +
//     allRoutesData.pjCurriculoCompleto.path +
//     propostaId
//   }
//   target="_blank"
// >
//   Ver CV Completo
// </Button>

export default FullCVBtn;
