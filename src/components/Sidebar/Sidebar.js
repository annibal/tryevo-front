import { forwardRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import logoFull from '../../assets/logo-full.png';
import MenuIcon from '@mui/icons-material/Menu';
import { allRoutesArray } from '../../base/routes_data'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import WidgetPF from "./WidgetPF";
import WidgetPJ from "./WidgetPJ";

// const fnClassName = ({ isActive }) => isActive ? "selected active" : ""

const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <NavLink ref={ref} to={href} {...other} />;
});

const Sidebar = () => {
  let auth = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarClassName = `sidebar${sidebarOpen ? ' open' : ''}`;

  const userFeatures = (auth?.features || {});

  return (
    <div className={sidebarClassName}>
      <div className="logo-container" onClick={() => setSidebarOpen(!sidebarOpen)}>
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
          if ((item.rules || []).every(rule => userFeatures[rule])) {
            return (
              <ListItem disablePadding key={item.key}>
                <ListItemButton
                  component={LinkBehavior}
                  to={`/app/${item.path}`}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          }

          return '';
        })}
      </List>

      <div className="sidebar-bottom-spacer" />
      
    </div>
  );
}

export default Sidebar;
