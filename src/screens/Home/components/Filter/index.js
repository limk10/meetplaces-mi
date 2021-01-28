import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Button,
  CircularProgress,
  ButtonGroup,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@material-ui/core";

import useStyles from "./styles";

import actionsLoading from "~/actions/loading";
import actionsLocations from "~/actions/locations";

let map;

const FilterMap = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    tipo: [],
  });
  const [locationType, setLocationType] = useState([
    { name: "Restaurante", value: "restaurant" },
    { name: "Bar", value: "bar" },
    { name: "Comida", value: "food" },
    { name: "Estacionamento", value: "parking" },
    { name: "Estabelecimento", value: "establishment" },
  ]);

  const isLoading = useSelector((state) => state.reducerLoading.handleLoading);
  const currentLocation = useSelector(
    (state) => state.reducerLocations.addCurrentLocation || {}
  );

  const handleToggle = (data, value) => {
    const { tipo } = filter;
    const currentIndex = tipo.indexOf(data);
    const newChecked = [...tipo];

    if (currentIndex === -1) {
      newChecked.push(data);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setFilter({
      tipo: newChecked,
    });
  };

  const handleSearchLocation = async (e) => {
    e.preventDefault();
    if (!!!Object.keys(currentLocation).length) return;
    try {
      dispatch(actionsLoading.handleLoading(true));
      const { lat, lng } = currentLocation;

      var latLng = new window.google.maps.LatLng(lat, lng);

      map = new window.google.maps.Map(document.getElementById("map"), {
        center: latLng,
        zoom: 15,
      });

      const { tipo } = filter;

      var request = {
        location: latLng,
        radius: "3000",
        type: tipo,
      };

      console.log("->", request);

      let service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.shift();
          dispatch(actionsLocations.addPlaces(results));
          dispatch(actionsLoading.handleLoading(false));
        }
      });
    } catch (error) {}
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Typography variant="button" display="block" gutterBottom>
          Tipo
        </Typography>
        <div>
          {locationType.map((item, value) => (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={() => handleToggle(item?.name, value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={filter?.tipo?.includes(item?.name)}
                  disableRipple
                  color="primary"
                  inputProps={{ "aria-labelledby": item?.name }}
                />
              </ListItemIcon>
              <ListItemText id={item?.name} primary={item?.name} />
            </ListItem>
          ))}
        </div>

        <Button
          className={classes.btnEnter}
          disabled={isLoading}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => handleSearchLocation(e)}
        >
          Pesquisar :)
        </Button>
        {isLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </form>
    </>
  );
};

export default FilterMap;
