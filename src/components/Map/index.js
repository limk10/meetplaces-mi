import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography, LinearProgress } from "@material-ui/core";

import useStyles from "./styles";

import actionsLocations from "~/actions/locations";

import GoogleMapReact from "google-map-react";

const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(
          Math.floor(place.rating)
        )}</span><span style="color: lightgrey;">${String.fromCharCode(
  9733
).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.types[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${"$".repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${place?.opening_hours?.isOpen() ? "Aberto" : "Fechado"}
      </div>
    </div>`;

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, places) => {
  const markers = [];
  const infowindows = [];

  !!places.length &&
    places.forEach((place) => {
      markers.push(
        new window.google.maps.Marker({
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          map,
        })
      );

      infowindows.push(
        new window.google.maps.InfoWindow({
          content: getInfoWindowString(place),
        })
      );
    });

  !!markers.length &&
    markers.forEach((marker, i) => {
      marker.addListener("click", () => {
        infowindows[i].open(map, marker);
      });
    });
};

function MapWrapper() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(false);
  const [mapReference, setMapReference] = useState();

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
          setLocalLoading(false);
        }
      );
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
      {!localLoading && !!Object.keys(currentLocation).length && (
        <GoogleMapReact
          ref={map}
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
