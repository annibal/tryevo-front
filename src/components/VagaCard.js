import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import allRoutesData from "../base/routes_data";
import { ACCOUNT_FEATURES, useAuth } from "../base/AuthContext";

const VagaCard = ({ _id, titulo, desc, qualificacoes, disableFavorite }) => {
  const auth = useAuth();
  if (auth.loading) return "";

  const vagaUrl = `/app/${allRoutesData.vagas.path}${_id}/${encodeURIComponent(titulo)}`;
  const isFavorite = false;

  // subheader="September 14, 2016"

  return (
    <Card>
      <CardHeader
        action={
          auth.features[ACCOUNT_FEATURES.LOGGED] &&
          !disableFavorite && (
            <IconButton
              aria-label="favorite"
              color={isFavorite ? "primary" : "default"}
            >
              <FavoriteIcon />
            </IconButton>
          )
        }
        title={<Link to={vagaUrl}>{titulo}</Link>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        {qualificacoes?.length > 1 &&
          qualificacoes.map((qualificacao) => (
            <Chip label={qualificacao} key={qualificacao} sx={{ mr: 2, mt: 2 }} />
          ))}
      </CardContent>
    </Card>
  );
};

export default VagaCard;
