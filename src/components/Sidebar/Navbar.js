import { Link } from "react-router-dom";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import logoFull from "../../assets/logo-full.png";
import MenuIcon from "@mui/icons-material/Menu";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { NAVBAR_PLACE, allRoutesArray } from "../../base/routes_data";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import NavbarMenu from "./NavbarMenu";
import NavbarSearchVagas from "./NavbarSearchVagas";
import NavbarAccount from "./NavbarAccount";

// const fnClassName = ({ isActive }) => isActive ? "selected active" : ""

const Navbar = ({ toolbarOpen, onSetToolbarOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let auth = useAuth();
  const userFeatures = auth?.features || {};

  // navbar only for > 600px
  if (isMobile) return "";

  const navbarClassName = `navbar`;

  // console.log(allRoutesArray.map(item => ({...item, userFeatures, allowed: (item.rules || []).every(rule => userFeatures[rule]), })))

  let logoLink = "/";
  const logoRoute = allRoutesArray.find(
    (item) =>
      item.navbar.place === NAVBAR_PLACE.IS_LOGO &&
      (item.rules || []).every((rule) => userFeatures[rule])
  );
  if (logoRoute) {
    logoLink = `/app/${logoRoute.path}`;
  }

  const menusAtStart = allRoutesArray
    .filter(
      (item) =>
        item.navbar.place === NAVBAR_PLACE.START_SIDE &&
        (item.rules || []).every((rule) => userFeatures[rule])
    )
    .reduce(
      (all, curr) => {
        if (curr.navbar.group) {
          all.groups[curr.navbar.group] = [
            ...(all.groups[curr.navbar.group] || []),
            curr,
          ];
        } else {
          all.root.push(curr);
        }
        return all;
      },
      { root: [], groups: {} }
    );
  const menusAtEnd = allRoutesArray
    .filter(
      (item) =>
        item.navbar.place === NAVBAR_PLACE.END_SIDE &&
        (item.rules || []).every((rule) => userFeatures[rule])
    )
    .reduce(
      (all, curr) => {
        if (curr.navbar.group) {
          all.groups[curr.navbar.group] = [
            ...(all.groups[curr.navbar.group] || []),
            curr,
          ];
        } else {
          all.root.push(curr);
        }
        return all;
      },
      { root: [], groups: {} }
    );

  // console.log(menusAtStart, menusAtEnd)

  const hasToolbar =
    allRoutesArray.filter(
      (item) =>
        item.navbar.place === NAVBAR_PLACE.TOOLBAR &&
        (item.rules || []).every((rule) => userFeatures[rule])
    ).length > 0;

  return (
    <Box className={navbarClassName}>
      <AppBar color="inherit" className="navbar-app-bar">
        <Toolbar variant="dense" disableGutters>
          <Grid container spacing={0} wrap="nowrap">
            {hasToolbar && (
              <Grid item>
                <Button
                  onClick={() => onSetToolbarOpen(!toolbarOpen)}
                  className="navbar-button navbar-toggle-sidebar"
                >
                  {toolbarOpen ? <FirstPageIcon /> : <MenuIcon />}
                </Button>
              </Grid>
            )}

            <Grid item>
              <Button
                LinkComponent={Link}
                to={logoLink}
                className="navbar-logo"
              >
                <img src={logoFull} alt="tryEvo" />
              </Button>
            </Grid>

            {menusAtStart.root.map((item) => (
              <Grid item key={item.key}>
                <Button
                  size="large"
                  className="navbar-button"
                  LinkComponent={Link}
                  to={`/app/${item.path}`}
                  startIcon={item.icon}
                >
                  {item.title}
                </Button>
              </Grid>
            ))}
            {Object.entries(menusAtStart.groups).map(([group, items]) => (
              <Grid item key={group}>
                <NavbarMenu
                  horizontal="left"
                  icon
                  id={`start menu ${group}`}
                  items={items}
                >
                  {group}
                </NavbarMenu>
              </Grid>
            ))}

            <Grid item xs>
              {(userFeatures[ACCOUNT_FEATURES.PF] || userFeatures[ACCOUNT_FEATURES.NOT_LOGGED]) && <NavbarSearchVagas />}
            </Grid>

            {menusAtEnd.root
              .slice()
              .reverse()
              .map((item) => (
                <Grid item key={item.key}>
                  <Button
                    size="large"
                    className="navbar-button"
                    LinkComponent={Link}
                    to={`/app/${item.path}`}
                    endIcon={item.icon}
                  >
                    {item.title}
                  </Button>
                </Grid>
              ))}
            {Object.entries(menusAtEnd.groups).map(([group, items]) => (
              <Grid item key={group}>
                <NavbarMenu
                  icon
                  id={`end menu ${group}`}
                  items={items.slice().reverse()}
                >
                  {group}
                </NavbarMenu>
              </Grid>
            ))}

            {userFeatures[ACCOUNT_FEATURES.LOGGED] && (
              <Grid item>
                <NavbarAccount />
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
