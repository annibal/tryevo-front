import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { NAVBAR_PLACE, allRoutesArray } from "../../base/routes_data";
import { useAuth } from "../../base/AuthContext";
import LinkBehavior from "../LinkBehavior";
import { useTheme } from "@emotion/react";

const SideToolbar = ({ open, onClose }) => {
  let auth = useAuth();
  const userFeatures = auth?.features || {};
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  if (isMobile) return "";

  return (
    <>
      <Drawer
        variant="permanent"
        className="side-toolbar-drawer"
        PaperProps={{
          className: "side-toolbar",
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <List disablePadding>
            {allRoutesArray.map((item) => {
              if (
                item.navbar.place === NAVBAR_PLACE.TOOLBAR &&
                (item.rules || []).every((rule) => userFeatures[rule])
              ) {
                return (
                  <Tooltip placement="right" title={item.title}>
                    <ListItem
                      disablePadding
                      key={item.key}
                      sx={{ height: "60px" }}
                    >
                      <ListItemButton
                        sx={{ height: "60px" }}
                        onClick={() => onClose()}
                        component={LinkBehavior}
                        to={`/app/${item.path}`}
                      >
                        <ListItemIcon sx={open ? {} : { minWidth: 0 }}>
                          {item.icon}
                        </ListItemIcon>
                        {open && <ListItemText primary={item.title} />}
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                );
              }

              return "";
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SideToolbar;
