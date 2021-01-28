import React, { useEffect } from "react";

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
import { Rating } from "@material-ui/lab";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import useStyles from "./styles";

import actionsLocations from "~/actions/locations";
import actionsLoading from "~/actions/loading";

let map;

const LocationList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const currentLocation = useSelector(
    (state) => state.reducerLocations.addCurrentLocation || {}
  );

  const locations = useSelector(
    (state) => state.reducerLocations.addPlaces || {}
  );

  const isLoading = useSelector((state) => state.reducerLoading.handleLoading);

  useEffect(() => {
    if (currentLocation) getLocationList();
  }, [currentLocation]);

  const getLocationList = async () => {
    dispatch(actionsLoading.handleLoading(true));
    if (!!!Object.keys(currentLocation).length) return;
    try {
      const { lat, lng } = currentLocation;

      var latLng = new window.google.maps.LatLng(lat, lng);

      map = new window.google.maps.Map(document.getElementById("map"), {
        center: latLng,
        zoom: 15,
      });

      var request = {
        location: latLng,
        radius: "3000",
        type: ["restaurant"],
      };

      let service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          dispatch(actionsLoading.handleLoading(false));
          dispatch(actionsLocations.addPlaces(results));
        }
      });
    } catch (error) {
      dispatch(actionsLoading.handleLoading(false));
    }
  };

  const getImageReference = (photos) => {
    if (photos?.length) {
      return photos[0].getUrl() + "&key=" + process.env.REACT_APP_API_KEY;
    } else {
      return "";
    }
  };

  return (
    <>
      {isLoading && (
        <Grid container>
          <CircularProgress style={{ margin: "0 auto" }} color="primary" />
        </Grid>
      )}
      {!isLoading && !!!locations.length && (
        <Grid item xs={12}>
          <Typography
            style={{ textAlign: "center" }}
            variant="overline"
            display="block"
            gutterBottom
          >
            Não foi possível carregar suas informações :(
          </Typography>
        </Grid>
      )}
      {!isLoading && !!locations.length && (
        <Grid item xs={12}>
          <Typography variant="button" display="block" gutterBottom>
            {locations?.length} Lugares proximos a você :)
          </Typography>
          <Grid container justify="flex-start" spacing={2}>
            {locations.map((value, key) => (
              <Grid key={key} item xs={6}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      height="140"
                      component="img"
                      className={classes.media}
                      image={getImageReference(value.photos)}
                      title={`image-${key}`}
                      alt={`image-${key}`}
                      loading="lazy"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h2">
                        {value?.name}
                      </Typography>
                      <div style={{ display: "flex", marginBottom: 10 }}>
                        <Typography
                          variant="body1"
                          style={{
                            marginTop: "2px",
                          }}
                        >
                          {value?.rating}
                        </Typography>
                        <Rating
                          disabled
                          name="customized-empty"
                          defaultValue={value?.rating}
                          precision={0.1}
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        />
                        <Typography
                          variant="caption"
                          display="block"
                          style={{ marginTop: "3px" }}
                        >
                          ({value?.user_ratings_total})
                        </Typography>
                      </div>
                      <Typography variant="body1" gutterBottom>
                        <b>Preço:</b>{" "}
                        {value.price_level
                          ? "$".repeat(value.price_level)
                          : "-"}
                      </Typography>
                      <Typography variant="body1">
                        {value?.opening_hours?.isOpen() ? "Aberto" : "Fechado"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {value?.vicinity}
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
