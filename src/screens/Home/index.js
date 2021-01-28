import React from "react";

import { Grid, Hidden } from "@material-ui/core";

import Map from "~/components/Map";

import useStyles from "./styles";

import LocationList from "./components/LocationList";
import FilterMap from "./components/Filter";

const Home = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={2}>
      <Grid item xs={6} sm={3}>
        <FilterMap />
      </Grid>
      <Grid className={classes.locationList} item xs={6} sm={5}>
        <LocationList />
      </Grid>
      <Grid item xs={0} sm={4}>
        <Map />
      </Grid>
    </Grid>
  );
};

export default Home;
