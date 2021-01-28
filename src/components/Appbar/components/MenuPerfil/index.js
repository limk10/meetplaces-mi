import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, Menu, MenuItem, Avatar } from "@material-ui/core";

import { logout } from "~/services/auth";

import useStyles from "../../styles";

import api from "~/services/api";

import actionsUser from "~/actions/user";

const MenuPerfil = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedUser = useSelector(
    (state) => state.reducerUser.addLoggedUser || ""
  );

  useEffect(() => {
    initUser();
  }, []);

  const initUser = async () => {
    try {
      const { data } = await api.get("/users/4");
      dispatch(actionsUser.addLoggedUser(data?.data));
    } catch (error) {}
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePerfil = () => {
    history.push("/perfil");
  };

  return (
    <div className={classes.menuIcon}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar alt="Remy Sharp" src={loggedUser?.avatar} />
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
        <MenuItem onClick={() => logout()}>Sair</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuPerfil;
