import actionsTypes from "~/actions/actionsTypes";

const INITIAL_STATE = {};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.ADD_CURRENT_LOCATION:
      return { ...state, addCurrentLocation: action.payload };

    case actionsTypes.ADD_PLACES:
      return { ...state, addPlaces: action.payload };

    default:
      return state;
  }
};

export default reducers;
