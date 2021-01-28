import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";

import MenuPerfil from "./components/MenuPerfil";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleRoute = (route) => {
    history.push(route);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Container style={{ paddingLeft: 0, paddingRight: 0 }} maxWidth="xl">
          <Toolbar>
            <Typography
              onClick={() => handleRoute("/home")}
              className={classes.logo}
              variant="h6"
            >
              &gt; Meet Places
            </Typography>
            <div className={classes.divider}>
              <Typography
                onClick={() => handleRoute("/home")}
                className={classes.menu}
                variant="h6"
              >
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
