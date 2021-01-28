import React, { useState } from "react";

import { Grid, Collapse, Button } from "@material-ui/core";

import Map from "~/components/Map";

import useStyles from "./styles";

import LocationList from "./components/LocationList";
import FilterMap from "./components/Filter";

const Home = () => {
  const [showFilter, setShowFilter] = useState(false);
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Button
          className={classes.btnSearh}
          fullWidth
          type="submit"
          variant={showFilter ? "outlined" : "contained"}
          color="primary"
          onClick={(e) => setShowFilter(!showFilter)}
        >
          {showFilter ? "Esconder Filtro" : "Ver Filtro"}
        </Button>
        <Collapse in={showFilter}>
          <FilterMap />
        </Collapse>
      </Grid>
      <Grid className={classes.locationList} item xs={12} sm={5}>
        <LocationList />
      </Grid>
      <Grid item xs={false} sm={4}>
        <Map />
      </Grid>
    </Grid>
  );
};

export default Home;
