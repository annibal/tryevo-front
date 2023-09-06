import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LinkBehavior from "../LinkBehavior";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const NavbarMenu = ({
  id,
  children,
  widget,
  items,
  icon = false,
  horizontal = "right",
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <Button
            className="navbar-button"
            onClick={handleClick}
            size="large"
            aria-controls={open ? id : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            endIcon={icon ? <ArrowDropDownIcon /> : ""}
          >
            {children}
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id={id}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          transform: `translateX(${horizontal === "right" ? -8 : 8}px)`,
        }}
        MenuListProps={{
          disablePadding: true,
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1,
              minWidth: 300,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                [horizontal === "right" ? "right" : "left"]: 32,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal, vertical: "top" }}
        anchorOrigin={{ horizontal, vertical: "bottom" }}
      >
        {widget}
        {(items || []).map((item) => (
          <MenuItem
            onClick={handleClose}
            disablePadding
            key={item.key}
            sx={{ height: "60px" }}
            component={LinkBehavior}
            to={`/app/${item.path}`}
          >
            <ListItemIcon fontSize="small">{item.icon}</ListItemIcon>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NavbarMenu;
