import React, { useState } from "react";

import { IconButton, Menu, MenuItem, Avatar } from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";

import { logout } from "~/services/auth";

import useStyles from "../../styles";

const MenuPerfil = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePerfil = () => {};

  return (
    <div className={classes.menuIcon}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        className={classes.menuPerfil}
      >
        <MenuItem onClick={() => handlePerfil()}>Perfil</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuPerfil;
