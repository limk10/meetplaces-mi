import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography, LinearProgress } from "@material-ui/core";

import useStyles from "./styles";

import actionsLocations from "~/actions/locations";

import GoogleMapReact from "google-map-react";

import {
  getInfoWindowString,
  handleApiLoaded,
  reloadMarkers,
} from "~/helpers/maps";

function MapWrapper() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(false);
  const [mapReference, setMapReference] = useState({});
  // const mapReference = React.useRef();

  const currentLocation = useSelector(
    (state) => state.reducerLocations.addCurrentLocation || {}
  );

  const locations = useSelector(
    (state) => state.reducerLocations.addPlaces || {}
  );

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    handleApiLoaded(mapReference, locations);
  }, [locations]);

  const getCurrentLocation = () => {
    try {
      if (navigator.geolocation) {
        setLocalLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude,
            };

            dispatch(actionsLocations.addCurrentLocation({ ...pos }));
            setLocalLoading(false);
          },
          (e) => {
            console.log(JSON.stringify(e));
            setLocalLoading(false);
          }
        );
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setLocalLoading(false);
    }
  };

  return (
    <div className={classes.mapStyles}>
      {localLoading && (
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
      {!localLoading && !!!Object.keys(currentLocation).length && (
        <Typography
          style={{ textAlign: "center" }}
          variant="overline"
          display="block"
          gutterBottom
        >
          Não foi possível carregar seu mapa :(
        </Typography>
      )}
      {!localLoading && !!Object.keys(currentLocation).length && (
        <GoogleMapReact
          ref={mapReference}
          id="map"
          bootstrapURLKeys={{
            key: process.env.REACT_APP_API_KEY,
            language: "pt-BR",
          }}
          defaultCenter={currentLocation}
          defaultZoom={14}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => setMapReference(map)}
        />
      )}
      <div id="map" />
    </div>
  );
}

export default MapWrapper;
