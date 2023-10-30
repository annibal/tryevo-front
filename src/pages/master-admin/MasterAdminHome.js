import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import { NAVBAR_PLACE, allRoutesArray } from "../../base/routes_data";
import { Link } from "react-router-dom";

const MasterAdminHome = () => {
  const auth = useAuth();
  const shortcutRoutes = allRoutesArray.filter(
    (route) =>
      route.rules.includes(ACCOUNT_FEATURES.MASTER_ADMIN) &&
      route.navbar.place === NAVBAR_PLACE.START_SIDE
  );

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Master Admin Home
      </Typography>

      <Box sx={{ my: 2 }}>
        <Typography variant="caption">
          Atalhos:
        </Typography>
        {shortcutRoutes.map((route) => (
          <div>
            <Button
              color="primary"
              variant="text"
              LinkComponent={Link}
              startIcon={route.icon}
              to={"/app/" + route.path}
              sx={{ mb: 1 }}
            >
              {route.title}
            </Button>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default MasterAdminHome;
