import React from "react";

import useStyles from "./styles";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import MenuPerfil from "./components/MenuPerfil";

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography className={classes.logo} variant="h6">
            &gt; Meet Places
          </Typography>
          <div className={classes.divider}>
            <Typography className={classes.menu} variant="h6">
              Home
            </Typography>
            <Typography className={classes.dividerMenu} variant="h6">
              -
            </Typography>
            <Typography className={classes.menu} variant="h6">
              Descubra
            </Typography>
          </div>
          <div style={{ flexGrow: 1 }} />
          <MenuPerfil />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
