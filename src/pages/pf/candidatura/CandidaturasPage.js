import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";

const candidaturasData = [
  6,
  7,
]

const CandidaturasPage = () => {
  return (
    <div className="candidaturas">
      <Grid container>
        {candidaturasData.map((item) => (
          <Grid item xs={12} key={item}>
            <div className="card">
              <Link to={'/app/' + allRoutesData.pfCandidaturas.path + item}>
                <h4>Candidatura {item}</h4>
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

export default CandidaturasPage;
