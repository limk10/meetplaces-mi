import React, { memo } from "react";

import useStyles from "./styles";

import { GoogleMap, LoadScript } from "@react-google-maps/api";

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MapWrapper() {
  const classes = useStyles();

  return (
    <LoadScript googleMapsApiKey="AIzaSyAXXuqigRDn8HXWo97siE0vRqhlKqQPo70">
      <GoogleMap
        mapContainerStyle={classes.mapStyles}
        center={center}
        zoom={10}
      ></GoogleMap>
    </LoadScript>
  );
}

export default memo(MapWrapper);
