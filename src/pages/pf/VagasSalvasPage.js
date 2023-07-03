import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const vagasSalvasData = [
  3,
  4,
  7,
]

const VagasSalvasPage = () => {
  return (
    <div className="vagas-salvas">
      <h3>Vagas Salvas</h3>
      <Grid container>
        {vagasSalvasData.map((item) => (
          <Grid item xs={12} key={item}>
            <div className="card">
              <Link to={`/app/vaga/${item}`}>
                <h4>Vaga {item}</h4>
                <p>Descrição da vaga</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ipsam blanditiis error minus maxime voluptatum recusandae nobis dolores quia optio, dolor pariatur placeat modi natus suscipit architecto mollitia molestias assumenda.</p>
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default VagasSalvasPage;
