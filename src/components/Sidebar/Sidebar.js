import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import { allRoutesArray } from "../../base/routes_data";
import {
  Badge,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import WidgetPF from "./WidgetPF";
import WidgetPJ from "./WidgetPJ";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import LinkBehavior from "../LinkBehavior";

// const fnClassName = ({ isActive }) => isActive ? "selected active" : ""

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let auth = useAuth();
  const userFeatures = auth?.features || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // sidebar only for mobile now
  if (!isMobile) return "";

  const sidebarClassName = `sidebar${sidebarOpen ? " open" : ""}`;

  // console.log(allRoutesArray.map(item => ({...item, userFeatures, allowed: (item.rules || []).every(rule => userFeatures[rule]), })))

  const hamburguerShowBadge = allRoutesArray.some((item) => {
    if ((item.rules || []).every((rule) => userFeatures[rule])) {
      if (item.avisoPlanoExpirado && auth.user?.planoExpirado) {
        return true;
      }
    }
  });

  return (
    <Box className={sidebarClassName}>
      <div
        className="logo-container"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Badge color="error" variant="dot" invisible={!hamburguerShowBadge}>
          <img src={process.env.PUBLIC_URL + "/logo-full.png"} alt="tryEvo" />
        </Badge>
        <MenuIcon className="hamburguer" />
      </div>

      {userFeatures[ACCOUNT_FEATURES.PF] && (
        <WidgetPF onClick={() => setSidebarOpen(false)} />
      )}

      {userFeatures[ACCOUNT_FEATURES.PJ] && (
        <WidgetPJ onClick={() => setSidebarOpen(false)} />
      )}

      <List onClick={() => setSidebarOpen(false)}>
        {allRoutesArray.map((item) => {
          if ((item.rules || []).every((rule) => userFeatures[rule])) {
            let showBadge = false;
            if (item.avisoPlanoExpirado && auth.user?.planoExpirado)
              showBadge = true;

            return (
              <ListItem disablePadding key={item.key}>
                <ListItemButton
                  component={LinkBehavior}
                  to={`/app/${item.path}`}
                >
                  <ListItemIcon>
                    <Badge
                      color="error"
                      badgeContent="!"
                      invisible={!showBadge}
                    >
                      {item.icon}
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          }

          return "";
        })}
      </List>

      <div className="sidebar-bottom-spacer" />
    </Box>
  );
};

export default Sidebar;
