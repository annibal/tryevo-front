import { Avatar, Box, Typography } from "@mui/material";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import WidgetPF from "./WidgetPF";
import WidgetPJ from "./WidgetPJ";
import NavbarMenu from "./NavbarMenu";
import { NAVBAR_PLACE, allRoutesArray } from "../../base/routes_data";

const NavbarAccount = ({}) => {
  let auth = useAuth();
  const userFeatures = auth?.features || {};

  let widgetFn;

  const isMasterAdmin = userFeatures[ACCOUNT_FEATURES.MASTER_ADMIN]

  if (userFeatures[ACCOUNT_FEATURES.PF] || isMasterAdmin) {
    widgetFn = WidgetPF;
  }
  if (userFeatures[ACCOUNT_FEATURES.PJ]) {
    widgetFn = WidgetPJ;
  }

  if (!widgetFn) return '';

  const [avatarPart, completenessPart] = widgetFn({
    onClick: () => {},
    asHook: true,
    noLink: true,
  });

  return (
    <NavbarMenu
      id="account-menu"
      widget={isMasterAdmin ? '' : completenessPart}
      items={allRoutesArray.filter(
        (item) =>
          item.navbar.place === NAVBAR_PLACE.UNDER_USER &&
          (item.rules || []).every((rule) => userFeatures[rule])
      )}
    >
      <div className="navbar-account">{avatarPart}</div>
      {/* <Box className="navbar-account">
        <Box className="navbar-account-text">
          <Typography align="right" variant="body1">
            {"User Name"}
          </Typography>
          <Typography align="right" variant="caption">
            {"Subtitle user name"}
          </Typography>
        </Box>
        <Avatar>{"AT"}</Avatar>
      </Box> */}
    </NavbarMenu>
  );
};

export default NavbarAccount;
