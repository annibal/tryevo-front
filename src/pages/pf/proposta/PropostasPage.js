import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";

const propostasData = [
  6,
  7,
]

const PropostasPage = () => {
  return (
    <div className="propostas">
      <Grid container>
        {propostasData.map((item) => (
          <Grid item xs={12} key={item}>
            <div className="card">
              <Link to={'/app/' + allRoutesData.pfPropostas.path + item}>
                <h4>Proposta {item}</h4>
                <p>Enviada em 01/01/2023</p>
                <p>Descrição da proposta feita</p>
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PropostasPage;
