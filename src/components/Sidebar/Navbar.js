import { forwardRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import logoFull from "../../assets/logo-full.png";
import MenuIcon from "@mui/icons-material/Menu";
import { allRoutesArray } from "../../base/routes_data";
import {
  AppBar,
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
  useMediaQuery,
} from "@mui/material";
import WidgetPF from "./WidgetPF";
import WidgetPJ from "./WidgetPJ";
import { useTheme } from "@emotion/react";
import NavbarMenu from "./NavbarMenu";
import NavbarSearch from "./NavbarSearch";

// const fnClassName = ({ isActive }) => isActive ? "selected active" : ""

const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <NavLink ref={ref} to={href} {...other} />;
});

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let auth = useAuth();
  const userFeatures = auth?.features || {};
  const [navbarOpen, setNavbarOpen] = useState(false);

  // navbar only for > 600px
  if (isMobile) return "";

  const navbarClassName = `navbar`;

  // console.log(allRoutesArray.map(item => ({...item, userFeatures, allowed: (item.rules || []).every(rule => userFeatures[rule]), })))

  return (
    <Box className={navbarClassName}>
      <AppBar color="inherit">
        <Container maxWidth="lg">
          <Toolbar variant="dense" disableGutters>
            <Grid container spacing={0} wrap="nowrap">

              <Grid item>
                <Button
                  LinkComponent={Link}
                  to={'/'}
                  className="navbar-logo"
                >
                  <img src={logoFull} alt="tryEvo" />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  className="navbar-button"
                  LinkComponent={Link}
                  to={'/'}
                >
                  Candidaturas
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  className="navbar-button"
                  LinkComponent={Link}
                  to={'/'}
                >
                  Link 2
                </Button>
              </Grid>

              <Grid item xs>
                <NavbarSearch />
              </Grid>
              
              <Grid item>
                <Button
                  size="large"
                  className="navbar-button"
                  LinkComponent={Link}
                  to={'/'}
                >
                  Link 2
                </Button>
              </Grid>
              <Grid item>
                <NavbarMenu />
              </Grid>

            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
