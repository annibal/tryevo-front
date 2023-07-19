import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../base/AuthContext";
import allRoutesData from "../base/routes_data";
import useFetch from "../providers/useFetch";
import ResponseWrapper from "../components/ResponseWrapper";
import VagaCard from "../components/VagaCard";

const VagasPage = () => {
  const auth = useAuth();
  const vagasResponse = useFetch('GET', 'vagas')
  console.log({ vagasResponse })

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

      <ResponseWrapper
        {...vagasResponse}
        list
        dataComponent={({ children }) => <Grid container spacing={2}>{children}</Grid>}
        dataItemComponent={({ item }) => (
          <Grid item xs={12}>
            <VagaCard {...item} />
          </Grid>
        )}
      />

    </div>
  );
}

export default VagasPage;
