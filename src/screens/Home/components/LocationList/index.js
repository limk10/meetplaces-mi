import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  CircularProgress,
} from "@material-ui/core";

import useStyles from "./styles";

import api from "~/services/api";

import actionsLocations from "~/actions/locations";

const LocationList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const currentLocation = useSelector(
    (state) => state.reducerLocations.addCurrentLocation || {}
  );

  const locations = useSelector(
    (state) => state.reducerLocations.addPlaces || {}
  );

  useEffect(() => {
    getLocationList();
  }, [currentLocation]);

  const getLocationList = async () => {
    if (!!!Object.keys(currentLocation).length) return;
    try {
      setLoading(true);
      const { lat, lng } = currentLocation;
      const params = `nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&language=pt-BR&key=${process.env.REACT_APP_API_KEY}`;
      const { data } = await api.get(
        "https://cors-anywhere.herokuapp.com/" +
          process.env.REACT_APP_GOOGLE_API +
          params
      );

      const { results, next_page_token } = data;

      dispatch(actionsLocations.addPlaces(results));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getImageReference = (photos) => {
    if (photos?.length) {
      const photoReference = photos[0].photo_reference;
      const params = `photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.REACT_APP_API_KEY}`;
      return process.env.REACT_APP_GOOGLE_API + params;
    } else {
      return "";
    }
  };

  return (
    <>
      {loading && (
        <Grid container>
          <CircularProgress style={{ margin: "0 auto" }} color="primary" />
        </Grid>
      )}
      {!loading && !!locations.length && (
        <Grid item xs={12}>
          <Typography variant="button" display="block" gutterBottom>
            {locations?.length} Lugares proximos a você :)
          </Typography>
          <Grid container justify="flex-start" spacing={3}>
            {locations.map((value, key) => (
              <Grid key={key} item xs={6}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={getImageReference(value.photos)}
                      title="image-"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h2">
                        <img
                          style={{ marginRight: 5 }}
                          src={value?.icon}
                          width={20}
                          height={20}
                        />
                        {value?.name?.length >= 25
                          ? `${value?.name?.slice(0, 25)}...`
                          : `${value?.name?.slice(0, 25)}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {value?.vicinity?.length >= 40
                          ? `${value?.vicinity?.slice(0, 40)}...`
                          : `${value?.vicinity?.slice(0, 40)}`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LocationList;
