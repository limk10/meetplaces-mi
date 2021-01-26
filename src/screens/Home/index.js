import React from "react";

import { Grid } from "@material-ui/core";

import Map from "~/components/Map";

import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={6}>
        aaa
      </Grid>
      <Grid item xs={6}>
        <Map />
      </Grid>
    </Grid>
  );
};

export default Home;
