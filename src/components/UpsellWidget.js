import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../base/routes_data";

const UpsellWidget = ({ children }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          py: 2,
          px: 3,
          border: "2px solid",
          borderColor: "grey.400",
          bgcolor: "grey.100",
          display: "inline-block",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recurso Indisponível
        </Typography>
        <Box
          sx={{
            mb: 2,
            px: 2,
            py: 1,
            width: "100%",
            border: "1px solid",
            borderColor: "error.light",
            display: "inline-block",
            bgcolor: "common.white",
          }}
        >
          {typeof children === "string" ? (
            <Typography color="error.dark" variant="h5">
              {children}
            </Typography>
          ) : (
            children
          )}
        </Box>
        <Typography sx={{ mb: 2 }}>
          Seu plano de assinatura ainda não te dá acesso a este recurso.
          <br />
          Atualize seu plano para ter acesso e muito mais!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          LinkComponent={Link}
          to={"/app/" + allRoutesData.assinatura.path}
          fullWidth
          disableElevation
        >
          Ver Planos
        </Button>
      </Box>
    </Box>
  );
};

export default UpsellWidget;
