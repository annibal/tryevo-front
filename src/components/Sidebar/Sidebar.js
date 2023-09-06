import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import logoFull from "../../assets/logo-full.png";
import MenuIcon from "@mui/icons-material/Menu";
import { allRoutesArray } from "../../base/routes_data";
import {
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  let auth = useAuth();
  const userFeatures = auth?.features || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // sidebar only for mobile now
  if (!isMobile) return '';

  const sidebarClassName = `sidebar${sidebarOpen ? " open" : ""}`;

  // console.log(allRoutesArray.map(item => ({...item, userFeatures, allowed: (item.rules || []).every(rule => userFeatures[rule]), })))

  return (
    <Box className={sidebarClassName}>
      <div
        className="logo-container"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <img src={logoFull} alt="tryEvo" />
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
            return (
              <ListItem disablePadding key={item.key}>
                <ListItemButton
                  component={LinkBehavior}
                  to={`/app/${item.path}`}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
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
