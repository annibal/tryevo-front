import { forwardRef, useState } from "react";
import { NavLink } from "react-router-dom";
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

// const fnClassName = ({ isActive }) => isActive ? "selected active" : ""

const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <NavLink ref={ref} to={href} {...other} />;
});

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  let auth = useAuth();
  const userFeatures = auth?.features || {};
  const [navbarOpen, setNavbarOpen] = useState(false);
  
  // navbar only for > 600px
  if (isMobile) return '';

  const navbarClassName = `navbar`;

  // console.log(allRoutesArray.map(item => ({...item, userFeatures, allowed: (item.rules || []).every(rule => userFeatures[rule]), })))

  return (
    <Box className={navbarClassName}>
      <div
        className="logo-container"
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        <img src={logoFull} alt="tryEvo" />
        <MenuIcon className="hamburguer" />
      </div>

      {userFeatures[ACCOUNT_FEATURES.PF] && (
        <WidgetPF onClick={() => setNavbarOpen(false)} />
      )}

      {userFeatures[ACCOUNT_FEATURES.PJ] && (
        <WidgetPJ onClick={() => setNavbarOpen(false)} />
      )}

      <List onClick={() => setNavbarOpen(false)}>
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

      <div className="navbar-bottom-spacer" />
    </Box>
  );
};

export default Navbar;
