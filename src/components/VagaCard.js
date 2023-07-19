import { Card, CardContent, CardHeader, Chip, IconButton, Stack, Typography } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import allRoutesData from "../base/routes_data";

const VagaCard = ({ _id, titulo, desc, qualificacoes }) => {

  const vagaUrl = `/app/${allRoutesData.vagas.path}${_id}/${titulo}`;
  const isFavorite = true;

  // subheader="September 14, 2016"

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="favorite" color={isFavorite ? 'primary' : 'default'}>
            <FavoriteIcon />
          </IconButton>
        }
        title={
          <Link to={vagaUrl}>
            {titulo}
          </Link>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        {qualificacoes?.length > 1 && (
          <Stack direction="row" spacing={1}>
            {qualificacoes.map((qualificacao) => (
              <Chip label={qualificacao} />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}

export default VagaCard;