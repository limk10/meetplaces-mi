import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography, LinearProgress } from "@material-ui/core";

import useStyles from "./styles";

import GoogleMapReact from "google-map-react";

import actionsLocations from "~/actions/locations";

function MapWrapper() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const currentLocation = useSelector(
    (state) => state.reducerLocations.addCurrentLocation || {}
  );

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude,
          };

          dispatch(actionsLocations.addCurrentLocation({ ...pos }));
          setLoading(false);
        },
        (e) => {
          setLoading(false);
          console.log("erro", e);
        }
      );
    }
  };

  return (
    <div className={classes.mapStyles}>
      {loading && (
        <>
          <Typography
            style={{ textAlign: "center" }}
            variant="overline"
            display="block"
            gutterBottom
          >
            Estamos carregando seu mapa... aguarde um instante :)
          </Typography>
          <LinearProgress style={{ width: "50%", margin: "0 auto" }} />
        </>
      )}
      {!loading && !!Object.keys(currentLocation).length && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_API_KEY,
            language: "pt-BR",
          }}
          defaultCenter={currentLocation}
          defaultZoom={14}
        ></GoogleMapReact>
      )}
    </div>
  );
}

export default MapWrapper;
