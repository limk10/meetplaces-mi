import React from "react";

import useStyles from "./styles";

import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";

import MenuPerfil from "./components/MenuPerfil";

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Container style={{ paddingLeft: 0, paddingRight: 0 }} maxWidth="xl">
          <Toolbar>
            <Typography className={classes.logo} variant="h6">
              &gt; Meet Places
            </Typography>
            <div className={classes.divider}>
              <Typography className={classes.menu} variant="h6">
                Home
              </Typography>
            </div>
            <div style={{ flexGrow: 1 }} />
            <MenuPerfil />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
