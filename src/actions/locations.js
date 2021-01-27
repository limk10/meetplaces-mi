import actionsTypes from "./actionsTypes";

export default {
  addCurrentLocation: (value) => {
    return {
      type: actionsTypes.ADD_CURRENT_LOCATION,
      payload: value,
    };
  },
  addPlaces: (value) => {
    return {
      type: actionsTypes.ADD_PLACES,
      payload: value,
    };
  },
};
