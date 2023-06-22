import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../base/AuthContext";

const vagasData = [
  'Programador',
  'Vendedor de Coxinha',
  'Analista de Sistemas',
  'Gerente Financeiro',
  'Programador Web',
  'Diretor de Banco',
  'CEO',
]

const VagasPage = () => {
  const auth = useAuth();

  return (
    <div className="vagas">
      
      <div className="card card-search-vagas">
        <h2>Buscar Vagas</h2>
        <Grid container spacing={2}>
          <Grid item xs>
            <input type="search" placeholder="Buscar" />
          </Grid>
          <Grid item>
            <button>Buscar</button>
          </Grid>
        </Grid>
      </div>

      <Grid container>
        {vagasData.map((item) => (
          <Grid item xs={12} key={item}>
            <div className="card">
              <Grid container>
                <Grid item xs>
                  <Link to={`/app/vaga/${item}`}>
                    <h4>{item}</h4>
                  </Link>
                </Grid>
                <Grid item>
                  {auth.user && (<>
                    <button className="btn-salvar">Salvar vaga</button>
                  </>)}
                </Grid>
              </Grid>
              <p>Descrição da vaga</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ipsam blanditiis error minus maxime voluptatum recusandae nobis dolores quia optio, dolor pariatur placeat modi natus suscipit architecto mollitia molestias assumenda.</p>
            </div>
          </Grid>
        ))}
      </Grid>

    </div>
  );
}

export default VagasPage;
